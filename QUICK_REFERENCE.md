# ⚡ QUICK REFERENCE CARD

Cheat sheet cepat untuk Zann WhatsApp Multi-Bot Manager

---

## 🚀 Quick Start

```bash
# Install
npm install

# Start
npm start

# Dashboard
http://localhost:3000
```

---

## 📱 Top Commands

```
.menu              # List all commands
.ping              # Test response
.owner             # Contact owner
.sticker           # Make sticker (reply to image)
.ai <text>         # Chat with AI
.ytmp3 <url>       # Download music
.tiktok <url>      # Download TikTok
.translate en <text> # Translate
```

---

## 📂 File Structure

```
app.js                 # Main app
settings.json          # Config
lib/                   # Core
plugins/               # Commands
  ├── ai/
  ├── downloader/
  ├── maker/
  ├── group/
  ├── islamic/
  ├── news/
  ├── entertainment/
  └── tools/
views/                 # Dashboard
sessions/              # WhatsApp data
```

---

## ⚙️ Configuration

```json
// settings.json
{
  "identity": {
    "botName": "Bot Name",
    "ownerNumber": "628xxx"
  },
  "dashboard": {
    "port": 3000,
    "username": "admin",
    "password": "password"
  },
  "apiKeys": {
    "openai": "sk-xxx",
    "gemini": "xxx"
  }
}
```

---

## 🔌 Create Plugin

```javascript
// plugins/category/command.js
export default {
  name: 'cmd',
  category: 'tools',
  description: 'Description',
  usage: '.cmd <arg>',
  
  async execute(context) {
    const { args, reply } = context;
    await reply('Hello!');
  }
};
```

---

## 🎯 Dashboard Routes

```
/                      # Login
/dashboard             # Main
/settings              # Config
/broadcast             # Mass message
/features              # Toggle
/logs                  # Live logs
```

---

## 📊 System Requirements

```
Node.js: 21+
FFmpeg: 4.4+
ImageMagick: 7.x+
Libwebp: 1.2+
RAM: 512MB+
Storage: 500MB+
```

---

## 🛠️ NPM Scripts

```bash
npm start          # Production
npm run dev        # Development
npm run pm2        # PM2 mode
```

---

## 🔐 Security

```javascript
// Owner-only
ownerOnly: true

// Group-only
groupOnly: true

// Anti-Call
antiCall: true

// Anti-Delete
antiDelete: true
```

---

## 📥 Popular Downloads

```
.ytmp4 <url>       # YouTube video
.ytmp3 <url>       # YouTube audio
.tiktok <url>      # TikTok no watermark
.instagram <url>   # Instagram media
.facebook <url>    # Facebook video
.twitter <url>     # Twitter video
```

---

## 👥 Group Management

```
.kick @user        # Remove member
.add <number>      # Add member
.promote @user     # Make admin
.demote @user      # Remove admin
.tagall [text]     # Tag everyone
.hidetag <text>    # Hidden tag
.linkgc            # Get invite link
```

---

## 🧠 AI Commands

```
.ai <question>     # OpenAI GPT
.gemini <question> # Google Gemini
.rembg             # Remove background
```

---

## 🎨 Maker

```
.sticker           # Image/video to sticker
.qc <text>         # Quote chat
.ttp <text>        # Text to image
```

---

## 🕌 Islamic

```
.alquran 1:1       # Al-Quran verse
.jadwalsholat Jakarta # Prayer time
.hadits            # Random hadith
.kisahnabi adam    # Prophet story
```

---

## 🛠️ Utilities

```
.translate en <text> # Translate
.ssweb <url>       # Screenshot
.calc 2+2          # Calculator
.shortlink <url>   # Shorten URL
.inspect <link>    # Group info
.rvo               # Read view once
.ping              # Speed test
.runtime           # Uptime
.botstatus         # System info
```

---

## 🎮 Games

```
.suit rock         # Rock paper scissors
.tictactoe         # Tic-tac-toe
.tebakgambar       # Guess image
.truthordare truth # Truth or dare
```

---

## 🔧 Troubleshooting

```bash
# Error: Module not found
npm install

# Error: Port in use
# Change port in settings.json

# Error: FFmpeg not found
# Install: choco install ffmpeg

# Error: Cannot connect
# Check QR code scanned

# Error: Command not working
# Check prefix (default: .)
```

---

## 📞 Support

```
Type: .owner       # Contact owner
Check: .menu       # All commands
Read: README.md    # Full docs
```

---

## 📈 Stats

```
Commands: 60+
Categories: 8
Aliases: 100+
Plugins: 40+
Dashboard Pages: 6
Documentation: 7 files
```

---

## 🎯 Key Features

```
✅ Multi-instance
✅ Plugin-based
✅ Live dashboard
✅ Real-time logs
✅ Dynamic settings
✅ Broadcast system
✅ Feature toggle
✅ Anti-call/delete
```

---

## 💡 Pro Tips

```
# Quick sticker
Forward image → .s

# Download music
.ytmp3 song name

# Group announce
.tagall message

# AI chat
.ai your question

# Translate
.tr en hello
```

---

## 🔑 Environment

```bash
# Windows
set NODE_ENV=production

# Linux/Mac
export NODE_ENV=production

# PM2
pm2 start app.js --name ZannBot
```

---

## 📦 Dependencies

```
@whiskeysockets/baileys
express
socket.io
ejs
fluent-ffmpeg
sharp
canvas
axios
openai
@google/generative-ai
```

---

## 🌐 API Keys

```
OpenAI: platform.openai.com
Gemini: makersuite.google.com
RemoveBG: remove.bg/api
Weather: openweathermap.org
```

---

## 📚 Documentation Files

```
README.md          # Main docs
INSTALLATION.md    # Setup guide
PLUGIN_GUIDE.md    # Plugin dev
FEATURES.md        # Feature list
STRUCTURE.md       # File structure
SYSTEM_TOOLS.md    # FFmpeg guide
USER_GUIDE.md      # User manual
PROJECT_SUMMARY.md # Complete summary
```

---

## ✅ Checklist

```
[ ] Node.js 21+ installed
[ ] FFmpeg installed
[ ] ImageMagick installed
[ ] Libwebp installed
[ ] npm install completed
[ ] settings.json configured
[ ] Bot started
[ ] QR code scanned
[ ] Test with .menu
[ ] Dashboard accessible
```

---

## 🎉 Ready!

```
Dashboard: http://localhost:3000
Username: admin (from settings.json)
Password: zann2025 (from settings.json)

Test command: .menu
Contact: .owner

Happy Botting! 🚀
```

---

**Zann WhatsApp Multi-Bot Manager**
**Version: 2.0.0**
**Node.js: 21+**
**License: MIT**

© 2025 Zann Enterprise
