import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import si from 'systeminformation';
import WhatsAppManager from './lib/whatsapp.js';
import { getConfig, validateConfig, updateConfig } from './lib/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate config on startup
if (!validateConfig()) {
  process.exit(1);
}

const config = getConfig();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const PORT = config.dashboard.port;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// WhatsApp Manager Instance
const waManager = new WhatsAppManager(io);

// Global Stats
let globalStats = {
  totalMessages: 0,
  activeInstances: 0,
  uptime: Date.now()
};

// Authentication Middleware
const auth = (req, res, next) => {
  const { username, password } = req.body;
  const sess = req.query.session;
  
  if (sess === 'active' || (username === config.dashboard.username && password === config.dashboard.password)) {
    next();
  } else {
    res.redirect('/?error=invalid');
  }
};

// Routes
app.get('/', (req, res) => {
  res.render('login', { error: req.query.error });
});

app.post('/login', auth, (req, res) => {
  res.redirect('/dashboard?session=active');
});

app.get('/dashboard', (req, res) => {
  if (req.query.session !== 'active') return res.redirect('/');
  
  const instances = waManager.getAllInstances();
  res.render('dashboard', {
    config,
    instances,
    stats: globalStats
  });
});

app.get('/settings', (req, res) => {
  if (req.query.session !== 'active') return res.redirect('/');
  res.render('settings', { config });
});

app.post('/settings/update', express.json(), (req, res) => {
  try {
    const { category, key, value } = req.body;
    updateConfig(category, key, value);
    res.json({ success: true, message: 'Settings updated! Restart bot to apply changes.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/broadcast', (req, res) => {
  if (req.query.session !== 'active') return res.redirect('/');
  const instances = waManager.getAllInstances();
  res.render('broadcast', { instances });
});

app.post('/broadcast/send', express.json(), async (req, res) => {
  try {
    const { instanceId, message, type, mediaUrl, targets } = req.body;
    const result = await waManager.broadcast(instanceId, message, type, mediaUrl, targets);
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/instance/create', express.json(), async (req, res) => {
  try {
    const { name } = req.body;
    const instance = await waManager.createInstance(name);
    res.json({ success: true, instanceId: instance.id });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/instance/delete/:id', async (req, res) => {
  try {
    await waManager.deleteInstance(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/features', (req, res) => {
  if (req.query.session !== 'active') return res.redirect('/');
  const features = waManager.getAllFeatures();
  res.render('features', { features, config });
});

app.post('/features/toggle', express.json(), (req, res) => {
  try {
    const { category, enabled } = req.body;
    updateConfig('features', category, enabled);
    res.json({ success: true, message: 'Feature toggled! Changes apply immediately.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/logs', (req, res) => {
  if (req.query.session !== 'active') return res.redirect('/');
  res.render('logs');
});

// Socket.IO Events
io.on('connection', (socket) => {
  console.log('Dashboard client connected:', socket.id);
  
  socket.on('createInstance', async (data, callback) => {
    try {
      console.log('Creating instance:', data.name);
      const instance = await waManager.createInstance(data.name);
      callback({ success: true, instanceId: instance.id });
    } catch (error) {
      console.error('Error creating instance:', error);
      callback({ success: false, error: error.message });
    }
  });
  
  socket.on('deleteInstance', async (instanceId, callback) => {
    try {
      await waManager.deleteInstance(instanceId);
      callback({ success: true });
    } catch (error) {
      callback({ success: false, error: error.message });
    }
  });
  
  socket.on('requestQR', async (instanceId) => {
    await waManager.requestQR(instanceId, socket);
  });
  
  socket.on('disconnect', () => {
    console.log('Dashboard client disconnected:', socket.id);
  });
});

// System Monitor
setInterval(async () => {
  try {
    const cpu = await si.currentLoad();
    const mem = await si.mem();
    const instances = waManager.getAllInstances();
    
    globalStats.activeInstances = instances.filter(i => i.status === 'connected').length;
    
    io.emit('systemStats', {
      cpu: cpu.currentLoad.toFixed(2),
      memory: ((mem.used / mem.total) * 100).toFixed(2),
      uptime: Date.now() - globalStats.uptime,
      instances: instances.map(i => ({
        id: i.id,
        name: i.name,
        status: i.status,
        messages: i.messageCount || 0
      }))
    });
  } catch (error) {
    console.error('System monitor error:', error);
  }
}, 5000);

// Start Server
httpServer.listen(PORT, async () => {
  console.log(`╔══════════════════════════════════════╗`);
  console.log(`║  🚀 ZANN MULTI-BOT MANAGER v2.0    ║`);
  console.log(`╚══════════════════════════════════════╝`);
  console.log(`📊 Dashboard: http://localhost:${PORT}`);
  console.log(`👤 Username: ${config.dashboard.username}`);
  console.log(`🔑 Password: ${config.dashboard.password}`);
  console.log(`⚡ Node.js: ${process.version}`);
  console.log(`🌍 Environment: ${config.app.nodeEnv}`);
  console.log(`════════════════════════════════════════\n`);
  
  // Auto-create default instance
  await waManager.createInstance('default');
});

// Graceful Shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down gracefully...');
  await waManager.shutdown();
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});
