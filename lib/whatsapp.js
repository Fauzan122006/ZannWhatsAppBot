import makeWASocket, {
  DisconnectReason,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  Browsers,
  delay
} from '@whiskeysockets/baileys';
import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import qrcode from 'qrcode';
import PluginLoader from './pluginLoader.js';
import { getConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class WhatsAppInstance {
  constructor(id, name, io) {
    this.id = id;
    this.name = name;
    this.io = io;
    this.sock = null;
    this.qr = null;
    this.status = 'disconnected';
    this.messageCount = 0;
    this.sessionPath = path.join(__dirname, '..', 'sessions', id);
    this.config = getConfig();
  }

  async connect() {
    const config = getConfig();
    const { state, saveCreds } = await useMultiFileAuthState(this.sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    this.sock = makeWASocket({
      version,
      auth: state,
      logger: pino({ level: 'silent' }),
      browser: Browsers.ubuntu('Chrome'),
      markOnlineOnConnect: true,
      generateHighQualityLinkPreview: true
    });

    // Connection Update
    this.sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        this.qr = qr;
        const qrImage = await qrcode.toDataURL(qr);
        this.io.emit('qr', { instanceId: this.id, qr: qrImage });
      }

      if (connection === 'close') {
        const shouldReconnect = 
          lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;

        this.status = 'disconnected';
        this.io.emit('instanceStatus', { instanceId: this.id, status: 'disconnected' });

        if (shouldReconnect) {
          console.log(`[${this.name}] Reconnecting...`);
          await delay(3000);
          await this.connect();
        }
      } else if (connection === 'open') {
        this.status = 'connected';
        this.qr = null;
        console.log(`[${this.name}] ✅ Connected successfully!`);
        this.io.emit('instanceStatus', { instanceId: this.id, status: 'connected' });
      }
    });

    // Credentials Update
    this.sock.ev.on('creds.update', saveCreds);

    // Messages Handler
    this.sock.ev.on('messages.upsert', async ({ messages, type }) => {
      if (type !== 'notify') return;

      for (const msg of messages) {
        if (!msg.message) continue;
        
        this.messageCount++;
        await this.handleMessage(msg);
      }
    });

    // Anti-Call Handler
    if (config.behavior?.antiCall) {
      this.sock.ev.on('call', async (calls) => {
        for (const call of calls) {
          await this.sock.rejectCall(call.id, call.from);
          await this.sock.sendMessage(call.from, {
            text: '❌ Anti-Call Active! Bot tidak menerima panggilan.'
          });
        }
      });
    }

    // Group Events
    this.sock.ev.on('group-participants.update', async (event) => {
      await this.handleGroupEvent(event);
    });
  }

  async handleMessage(msg) {
    const config = getConfig();
    const pluginLoader = PluginLoader.getInstance();

    try {
      // Auto-Read
      if (config.behavior?.autoRead) {
        await this.sock.readMessages([msg.key]);
      }

      // Parse message
      const from = msg.key.remoteJid;
      const isGroup = from.endsWith('@g.us');
      const sender = msg.key.participant || msg.key.remoteJid;
      const body = 
        msg.message?.conversation ||
        msg.message?.extendedTextMessage?.text ||
        msg.message?.imageMessage?.caption ||
        msg.message?.videoMessage?.caption ||
        '';

      // Check prefix
      const prefixes = config.behavior?.allowedPrefixes || ['.', '!', '/', '#'];
      const prefix = prefixes.find(p => body.startsWith(p));
      if (!prefix) return;

      // Auto-Typing
      if (config.behavior?.autoTyping) {
        await this.sock.sendPresenceUpdate('composing', from);
      }

      // Parse command
      const args = body.slice(prefix.length).trim().split(/ +/);
      const command = args.shift().toLowerCase();

      // Command context
      const context = {
        sock: this.sock,
        msg,
        from,
        sender,
        isGroup,
        args,
        body,
        command,
        prefix,
        config,
        reply: async (text) => {
          return await this.sock.sendMessage(from, { text }, { quoted: msg });
        },
        react: async (emoji) => {
          return await this.sock.sendMessage(from, {
            react: { text: emoji, key: msg.key }
          });
        }
      };

      // Execute command
      const executed = await pluginLoader.execute(command, context);
      
      if (executed) {
        this.messageCount++;
      }

      // Log
      this.io.emit('commandLog', {
        instanceId: this.id,
        command,
        from: sender,
        timestamp: Date.now()
      });

    } catch (error) {
      console.error(`[${this.name}] Message handling error:`, error);
      this.io.emit('error', {
        instanceId: this.id,
        error: error.message,
        timestamp: Date.now()
      });
    }
  }

  async handleGroupEvent(event) {
    const config = getConfig();
    if (!config.behavior?.welcomeMessage) return;

    const { id, participants, action } = event;

    try {
      if (action === 'add') {
        for (const participant of participants) {
          const text = `👋 Welcome @${participant.split('@')[0]} to the group!\n\n${config.identity?.footerText || ''}`;
          await this.sock.sendMessage(id, {
            text,
            mentions: [participant]
          });
        }
      } else if (action === 'remove') {
        for (const participant of participants) {
          const text = `👋 Goodbye @${participant.split('@')[0]}!`;
          await this.sock.sendMessage(id, {
            text,
            mentions: [participant]
          });
        }
      }
    } catch (error) {
      console.error('Group event error:', error);
    }
  }

  async disconnect() {
    if (this.sock) {
      await this.sock.logout();
      this.sock = null;
      this.status = 'disconnected';
    }
  }
}

class WhatsAppManager {
  constructor(io) {
    this.io = io;
    this.instances = new Map();
    this.pluginLoader = PluginLoader.getInstance();
    this.pluginLoader.loadAllPlugins();
  }

  async createInstance(name) {
    const id = `instance_${Date.now()}`;
    const instance = new WhatsAppInstance(id, name, this.io);
    this.instances.set(id, instance);
    
    await instance.connect();
    return instance;
  }

  async deleteInstance(id) {
    const instance = this.instances.get(id);
    if (instance) {
      await instance.disconnect();
      this.instances.delete(id);
      
      // Delete session folder
      const sessionPath = path.join(__dirname, '..', 'sessions', id);
      if (fs.existsSync(sessionPath)) {
        fs.rmSync(sessionPath, { recursive: true, force: true });
      }
    }
  }

  getInstance(id) {
    return this.instances.get(id);
  }

  getAllInstances() {
    return Array.from(this.instances.values()).map(i => ({
      id: i.id,
      name: i.name,
      status: i.status,
      messageCount: i.messageCount
    }));
  }

  getAllFeatures() {
    return this.pluginLoader.getAllCommands();
  }

  async broadcast(instanceId, message, type, mediaUrl, targets) {
    const instance = this.getInstance(instanceId);
    if (!instance || !instance.sock) {
      throw new Error('Instance not connected');
    }

    const config = getConfig();
    const delay = config.broadcast?.delay || 3000;
    const results = [];

    for (const target of targets) {
      try {
        if (type === 'text') {
          await instance.sock.sendMessage(target, { text: message });
        } else if (type === 'image' && mediaUrl) {
          await instance.sock.sendMessage(target, {
            image: { url: mediaUrl },
            caption: message
          });
        }
        
        results.push({ target, success: true });
        await new Promise(resolve => setTimeout(resolve, delay));
      } catch (error) {
        results.push({ target, success: false, error: error.message });
      }
    }

    return results;
  }

  async requestQR(instanceId, socket) {
    const instance = this.getInstance(instanceId);
    if (instance && instance.qr) {
      const qrImage = await qrcode.toDataURL(instance.qr);
      socket.emit('qr', { instanceId, qr: qrImage });
    }
  }

  async shutdown() {
    for (const [id, instance] of this.instances) {
      await instance.disconnect();
    }
    this.instances.clear();
  }
}

export default WhatsAppManager;
