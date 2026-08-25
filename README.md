# 🚀 Zann WhatsApp Multi-Bot Manager v2.0

Enterprise-grade WhatsApp Multi-Bot Manager dengan 200+ fitur dan Plugin-Based Architecture.

## ✨ Features

- 🤖 **Multi-Instance Management** - Kelola banyak bot WhatsApp dalam satu dashboard
- 🔌 **Plugin-Based Architecture** - Sistem plugin modular untuk mudah menambah fitur
- 🎨 **Glassmorphism Dashboard** - UI modern dengan dark mode dan animasi Tailwind
- ⚙️ **Dynamic Settings** - Edit watermark, API keys, dan behavior via dashboard
- 📢 **Broadcast System** - Kirim pesan massal dengan delay anti-ban
- 📊 **Real-time Monitoring** - Monitor CPU, RAM, dan status instance secara real-time
- 📝 **Live Logs** - Stream log command dan error via Socket.io

## 📦 Plugin Categories

### 🧠 AI & Machine Learning (20+ commands)
- `.ai` - Chat with OpenAI GPT
- `.gemini` - Google Gemini AI
- `.rembg` - Remove background from images
- Dan masih banyak lagi...

### 📥 Downloader (30+ commands)
- `.tiktok` - Download TikTok tanpa watermark
- `.instagram` - Download IG Story/Reel/Post
- `.ytmp4` - Download YouTube video
- `.spotify`, `.soundcloud`, dll

### 🎨 Maker & Graphics (25+ commands)
- `.sticker` - Buat sticker dengan watermark dinamis
- `.qc` - Quote chat maker
- `.ttp` - Text to PNG
- `.memegen`, `.carbon`, dll

### 👥 Group Management (20+ commands)
- `.kick` - Kick member
- `.tagall` - Tag semua member
- `.hidetag` - Hidden tag
- `.promote`, `.demote`, `.linkgc`, dll

### 🕌 Islamic (20+ commands)
- `.alquran` - Al-Quran per ayat
- `.jadwalsholat` - Jadwal sholat
- `.hadits`, `.kisahnabi`, dll

### 📰 News & Search (20+ commands)
- `.google` - Google search
- `.weather` - Informasi cuaca
- `.crypto`, `.stock`, dll

### 🎮 Entertainment (30+ commands)
- `.suit` - Rock paper scissors
- `.tictactoe` - Tic-tac-toe game
- `.tebakgambar`, `.family100`, dll

### 🛠️ Tools & Utilities (35+ commands)
- `.rvo` - Read view once
- `.translate` - Terjemahkan teks
- `.ssweb` - Screenshot website
- `.calc`, `.shortlink`, dll

## 🚀 Installation

### Prerequisites

**Node.js 21+ Required**

```bash
node --version  # Harus >= 21.0.0
```

### Install Dependencies

```bash
npm install
```

### Install Required System Tools

#### Windows
```bash
# Install FFmpeg
choco install ffmpeg

# Install ImageMagick
choco install imagemagick

# Install libwebp
# Download dari: https://developers.google.com/speed/webp/download
# Extract ke C:\libwebp dan tambahkan ke PATH
```

#### Linux/Ubuntu
```bash
sudo apt update
sudo apt install -y ffmpeg imagemagick libwebp-dev
```

#### macOS
```bash
brew install ffmpeg imagemagick webp
```

## ⚙️ Configuration

Edit `settings.json` untuk mengatur:

```json
{
  "watermark": {
    "packname": "🚀 Your Bot Name",
    "author": "Your Name",
    "url": "https://yourwebsite.com"
  },
  "identity": {
    "botName": "Your Bot",
    "ownerName": "Your Name",
    "ownerNumber": "6281234567890",
    "footerText": "© 2025 Your Brand"
  },
  "apiKeys": {
    "openai": "sk-your-key",
    "gemini": "your-key",
    "removebg": "your-key",
    "weatherapi": "your-key"
  },
  "dashboard": {
    "port": 3000,
    "username": "admin",
    "password": "yourpassword"
  }
}
```

## 🎯 Usage

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Using PM2
```bash
npm run pm2
```

### Access Dashboard

```
URL: http://localhost:3000
Username: admin (sesuai settings.json)
Password: zann2025 (sesuai settings.json)
```

## 📱 WhatsApp Setup

1. Buka dashboard di browser
2. Klik "Create Instance"
3. Scan QR code dengan WhatsApp
4. Bot siap digunakan!

## 🔧 Creating New Plugin

Buat file baru di folder `plugins/<category>/`:

```javascript
// plugins/tools/mycommand.js
export default {
  name: 'mycommand',
  aliases: ['mc', 'cmd'],
  category: 'tools',
  description: 'My custom command',
  usage: '.mycommand <arg>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    // Your command logic here
    await reply('Hello World!');
  }
};
```

Bot akan otomatis load plugin saat restart.

## 🎨 Dashboard Features

### 📊 Dashboard
- Real-time system stats (CPU, RAM, Uptime)
- Instance management
- QR code scanner
- Status monitoring

### ⚙️ Settings
- Edit watermark sticker
- Update bot identity
- Configure API keys
- Toggle bot behavior

### 📢 Broadcast
- Send mass messages (text/image)
- Target selection
- Auto-delay anti-ban
- Success/fail tracking

### 🎯 Features
- Toggle plugin categories
- Enable/disable features
- View command list

### 📝 Logs
- Real-time command logs
- Error tracking
- Live stream via Socket.io

## 🛡️ Security Features

- ✅ Anti-Call (reject panggilan otomatis)
- ✅ Anti-Delete (detect pesan terhapus)
- ✅ Anti-Link (kick pengirim link)
- ✅ Owner-only commands
- ✅ Group-only commands

## 📚 API Keys

### OpenAI
https://platform.openai.com/api-keys

### Google Gemini
https://makersuite.google.com/app/apikey

### RemoveBG
https://remove.bg/api

### Weather API
https://openweathermap.org/api

## 🤝 Contributing

Contributions welcome! Silakan buat PR untuk menambah plugin baru.

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
# Ganti port di settings.json
"dashboard": { "port": 8080 }
```

### QR Code tidak muncul
```bash
# Pastikan instance status "disconnected"
# Klik tombol "QR Code" di dashboard
```

### Plugin tidak load
```bash
# Pastikan file ada di folder plugins/<category>/
# Restart bot dengan npm start
```

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buat issue di GitHub atau hubungi owner bot.

## 🎉 Credits

- **Baileys** - WhatsApp Web API
- **Express.js** - Web framework
- **Socket.io** - Real-time communication
- **Tailwind CSS** - UI styling

---

**Made with ❤️ by Zann Enterprise**
