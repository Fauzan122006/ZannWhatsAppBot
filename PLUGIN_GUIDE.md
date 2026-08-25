# 🎯 PLUGIN DEVELOPMENT GUIDE

## 📚 Table of Contents
1. [Plugin Structure](#plugin-structure)
2. [Creating Your First Plugin](#creating-your-first-plugin)
3. [Context Object](#context-object)
4. [Advanced Features](#advanced-features)
5. [Best Practices](#best-practices)

---

## 🏗️ Plugin Structure

Setiap plugin adalah file JavaScript ES Module dengan export default berisi:

```javascript
export default {
  name: 'commandname',           // Nama command (required)
  aliases: ['alias1', 'alias2'], // Alias command (optional)
  category: 'tools',              // Kategori plugin (required)
  description: 'Command desc',    // Deskripsi (required)
  usage: '.commandname <args>',   // Cara pakai (required)
  ownerOnly: false,               // Hanya owner? (optional)
  groupOnly: false,               // Hanya grup? (optional)
  
  async execute(context) {
    // Logic command di sini
  }
};
```

---

## 🎨 Creating Your First Plugin

### 1. Simple Text Reply

Buat file `plugins/tools/hello.js`:

```javascript
export default {
  name: 'hello',
  aliases: ['hi', 'halo'],
  category: 'tools',
  description: 'Say hello',
  usage: '.hello',
  
  async execute(context) {
    const { reply, settings } = context;
    await reply(`Hello! I'm ${settings.identity.botName}`);
  }
};
```

### 2. Command with Arguments

File `plugins/tools/say.js`:

```javascript
export default {
  name: 'say',
  category: 'tools',
  description: 'Repeat your message',
  usage: '.say <text>',
  
  async execute(context) {
    const { args, reply } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .say <text>');
    }
    
    const text = args.join(' ');
    await reply(text);
  }
};
```

### 3. API Integration

File `plugins/tools/joke.js`:

```javascript
import axios from 'axios';

export default {
  name: 'joke',
  category: 'entertainment',
  description: 'Get random joke',
  usage: '.joke',
  
  async execute(context) {
    const { reply, settings } = context;
    
    try {
      const response = await axios.get('https://api.jokes.one/jod');
      const joke = response.data.contents.jokes[0].joke.text;
      
      await reply(`😂 ${joke}\n\n${settings.identity.footerText}`);
    } catch (error) {
      await reply('❌ Failed to fetch joke!');
    }
  }
};
```

### 4. Media Handler

File `plugins/maker/toimage.js`:

```javascript
export default {
  name: 'toimage',
  aliases: ['toimg'],
  category: 'maker',
  description: 'Convert sticker to image',
  usage: '.toimage (reply to sticker)',
  
  async execute(context) {
    const { msg, sock, from, reply } = context;
    
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const stickerMsg = quoted?.stickerMessage;
    
    if (!stickerMsg) {
      return await reply('❌ Reply to a sticker!');
    }
    
    try {
      const buffer = await sock.downloadMediaMessage(stickerMsg);
      
      await sock.sendMessage(from, {
        image: buffer,
        caption: 'Converted to image!'
      }, { quoted: msg });
      
    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
```

---

## 📦 Context Object

Object `context` yang diterima oleh `execute()` berisi:

```javascript
{
  // WhatsApp Socket
  sock: <BaileysSocket>,
  
  // Message Info
  msg: <MessageObject>,      // Raw message object
  from: '628xxx@s.whatsapp.net',  // Chat ID
  sender: '628xxx@s.whatsapp.net', // Sender ID
  isGroup: true/false,       // Is group chat?
  
  // Parsed Command
  body: 'full message text',
  command: 'commandname',
  args: ['arg1', 'arg2'],
  prefix: '.',
  
  // Settings
  settings: <SettingsObject>,
  
  // Helper Functions
  reply: async (text) => {},      // Quick reply
  react: async (emoji) => {}      // React to message
}
```

### Helper Functions

```javascript
// Quick Reply
await context.reply('Hello!');

// React to Message
await context.react('✅');

// Send Image
await context.sock.sendMessage(context.from, {
  image: { url: 'https://example.com/image.jpg' },
  caption: 'Caption here'
}, { quoted: context.msg });

// Send Video
await context.sock.sendMessage(context.from, {
  video: { url: 'https://example.com/video.mp4' },
  caption: 'Caption here'
}, { quoted: context.msg });

// Send Audio
await context.sock.sendMessage(context.from, {
  audio: { url: 'https://example.com/audio.mp3' },
  mimetype: 'audio/mp4'
}, { quoted: context.msg });

// Send Document
await context.sock.sendMessage(context.from, {
  document: { url: 'https://example.com/doc.pdf' },
  fileName: 'document.pdf',
  mimetype: 'application/pdf'
}, { quoted: context.msg });
```

---

## 🚀 Advanced Features

### 1. Owner-Only Command

```javascript
export default {
  name: 'broadcast',
  category: 'owner',
  description: 'Broadcast message',
  usage: '.broadcast <text>',
  ownerOnly: true,  // ✅ Only owner can use
  
  async execute(context) {
    // Logic here
  }
};
```

### 2. Group-Only Command

```javascript
export default {
  name: 'kick',
  category: 'group',
  description: 'Kick member',
  usage: '.kick @user',
  groupOnly: true,  // ✅ Only in groups
  
  async execute(context) {
    const { isGroup } = context;
    // Logic here
  }
};
```

### 3. Database/Storage

```javascript
// Using Map for simple storage
const userData = new Map();

export default {
  name: 'setname',
  category: 'tools',
  description: 'Set your name',
  usage: '.setname <name>',
  
  async execute(context) {
    const { args, sender, reply } = context;
    
    if (args.length === 0) {
      const savedName = userData.get(sender);
      return await reply(`Your name: ${savedName || 'Not set'}`);
    }
    
    const name = args.join(' ');
    userData.set(sender, name);
    await reply(`✅ Name saved: ${name}`);
  }
};
```

### 4. Game with State

```javascript
const activeGames = new Map();

export default {
  name: 'quiz',
  category: 'entertainment',
  description: 'Quiz game',
  usage: '.quiz',
  
  async execute(context) {
    const { from, body, reply } = context;
    
    // Check if answering
    if (activeGames.has(from)) {
      const game = activeGames.get(from);
      
      if (body.toLowerCase() === game.answer) {
        activeGames.delete(from);
        return await reply('🎉 Correct!');
      } else {
        return await reply('❌ Wrong! Try again');
      }
    }
    
    // Start new game
    const question = {
      q: 'What is 2+2?',
      answer: '4'
    };
    
    activeGames.set(from, question);
    await reply(`❓ ${question.q}\n\nType your answer!`);
    
    // Auto-delete after 30s
    setTimeout(() => {
      if (activeGames.has(from)) {
        activeGames.delete(from);
        reply('⏰ Time\'s up!');
      }
    }, 30000);
  }
};
```

### 5. Multi-Step Command

```javascript
const waitingReply = new Map();

export default {
  name: 'form',
  category: 'tools',
  description: 'Fill form',
  usage: '.form',
  
  async execute(context) {
    const { from, sender, body, reply } = context;
    
    // Check if user is filling form
    if (waitingReply.has(sender)) {
      const step = waitingReply.get(sender);
      
      if (step === 1) {
        waitingReply.set(sender, 2);
        return await reply('Step 2: Enter your age');
      } else if (step === 2) {
        waitingReply.delete(sender);
        return await reply('✅ Form completed!');
      }
    }
    
    // Start form
    waitingReply.set(sender, 1);
    await reply('📝 Form Started\nStep 1: Enter your name');
  }
};
```

---

## ✨ Best Practices

### 1. Error Handling

```javascript
async execute(context) {
  try {
    // Your logic
    await reply('Success!');
  } catch (error) {
    console.error('Command error:', error);
    await reply(`❌ Error: ${error.message}`);
  }
}
```

### 2. Input Validation

```javascript
async execute(context) {
  const { args, reply } = context;
  
  // Check arguments
  if (args.length === 0) {
    return await reply('❌ Usage: .command <arg>');
  }
  
  // Validate format
  const url = args[0];
  if (!url.startsWith('http')) {
    return await reply('❌ Invalid URL!');
  }
  
  // Continue...
}
```

### 3. Loading Indicator

```javascript
async execute(context) {
  const { reply, react } = context;
  
  await react('⏳');  // Loading
  
  // Do heavy task
  await heavyOperation();
  
  await react('✅');  // Done
  await reply('Completed!');
}
```

### 4. Rate Limiting

```javascript
const cooldowns = new Map();

async execute(context) {
  const { sender, reply } = context;
  
  // Check cooldown
  if (cooldowns.has(sender)) {
    const timeLeft = cooldowns.get(sender) - Date.now();
    if (timeLeft > 0) {
      return await reply(`⏰ Cooldown: ${Math.ceil(timeLeft/1000)}s`);
    }
  }
  
  // Set cooldown (10 seconds)
  cooldowns.set(sender, Date.now() + 10000);
  
  // Execute command
  await reply('Command executed!');
}
```

### 5. Clean Code

```javascript
export default {
  name: 'calculator',
  category: 'tools',
  description: 'Calculate expression',
  usage: '.calc <expression>',
  
  async execute(context) {
    const { args, reply } = context;
    
    // Validate input
    if (!this.validateInput(args)) {
      return await reply('❌ Invalid input!');
    }
    
    // Calculate
    const result = this.calculate(args.join(' '));
    
    // Send result
    await reply(`Result: ${result}`);
  },
  
  // Helper methods
  validateInput(args) {
    return args.length > 0;
  },
  
  calculate(expression) {
    return Function(`return ${expression}`)();
  }
};
```

---

## 📁 File Structure

```
plugins/
├── ai/
│   ├── ai.js
│   ├── gemini.js
│   └── dalle.js
├── downloader/
│   ├── tiktok.js
│   ├── youtube.js
│   └── instagram.js
├── maker/
│   ├── sticker.js
│   ├── qc.js
│   └── ttp.js
├── group/
│   ├── kick.js
│   ├── promote.js
│   └── tagall.js
├── islamic/
│   ├── alquran.js
│   └── jadwalsholat.js
├── news/
│   ├── google.js
│   └── weather.js
├── entertainment/
│   ├── suit.js
│   └── tictactoe.js
└── tools/
    ├── translate.js
    ├── calc.js
    └── ping.js
```

---

## 🔄 Plugin Lifecycle

1. **Load**: Plugin di-load saat bot start
2. **Register**: Command & aliases didaftarkan
3. **Execute**: Dipanggil saat user trigger command
4. **Cleanup**: Auto cleanup saat bot restart

---

## 🧪 Testing Plugin

```javascript
// Test locally
node plugins/tools/yourplugin.js

// Or create test file
import plugin from './plugins/tools/yourplugin.js';

const mockContext = {
  reply: async (text) => console.log('Reply:', text),
  args: ['test'],
  settings: { identity: { footerText: 'Footer' } }
};

await plugin.execute(mockContext);
```

---

## 📚 Examples Library

Check folder `plugins/` untuk lebih banyak contoh:
- AI Integration: `plugins/ai/`
- Media Processing: `plugins/maker/`
- Group Management: `plugins/group/`
- API Usage: `plugins/downloader/`

---

## 🆘 Troubleshooting

### Plugin not loading
- Check file syntax
- Verify export default
- Check file location in correct category folder

### Command not responding
- Check prefix match
- Verify category enabled in dashboard
- Check logs for errors

### Memory leak
- Use Map instead of Object for storage
- Clear old data periodically
- Avoid global variables

---

Happy Plugin Development! 🚀
