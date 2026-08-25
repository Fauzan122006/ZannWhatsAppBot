# 📚 INSTALLATION GUIDE - Zann WhatsApp Multi-Bot Manager

## 📋 Prerequisites

### 1. Node.js 21+
**Windows:**
```bash
# Download installer dari:
https://nodejs.org/en/download/

# Atau menggunakan Chocolatey:
choco install nodejs --version=21.0.0

# Verify installation:
node --version
npm --version
```

**Linux/Ubuntu:**
```bash
# Install Node.js 21 via NodeSource:
curl -fsSL https://deb.nodesource.com/setup_21.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify:
node --version
```

**macOS:**
```bash
# Using Homebrew:
brew install node@21

# Verify:
node --version
```

---

## 🛠️ System Dependencies

### FFmpeg (Required for media processing)

**Windows:**
```bash
# Method 1: Using Chocolatey
choco install ffmpeg

# Method 2: Manual Installation
# 1. Download dari: https://www.gyan.dev/ffmpeg/builds/
# 2. Extract ke C:\ffmpeg
# 3. Tambahkan C:\ffmpeg\bin ke PATH
# 4. Restart terminal

# Verify:
ffmpeg -version
```

**Linux/Ubuntu:**
```bash
sudo apt update
sudo apt install -y ffmpeg

# Verify:
ffmpeg -version
```

**macOS:**
```bash
brew install ffmpeg

# Verify:
ffmpeg -version
```

---

### ImageMagick (Required for image processing)

**Windows:**
```bash
# Method 1: Using Chocolatey
choco install imagemagick

# Method 2: Manual Installation
# Download dari: https://imagemagick.org/script/download.php#windows
# Install dengan opsi "Install legacy utilities"

# Verify:
magick --version
```

**Linux/Ubuntu:**
```bash
sudo apt install -y imagemagick

# Verify:
convert --version
```

**macOS:**
```bash
brew install imagemagick

# Verify:
convert --version
```

---

### Libwebp (Required for WebP sticker support)

**Windows:**
```bash
# Download libwebp dari:
https://developers.google.com/speed/webp/download

# Extract ke: C:\libwebp
# Tambahkan C:\libwebp\bin ke PATH environment variable

# Cara menambahkan ke PATH:
# 1. Windows Key + R -> sysdm.cpl
# 2. Advanced -> Environment Variables
# 3. Edit PATH -> New -> C:\libwebp\bin
# 4. Restart terminal

# Verify:
cwebp -version
```

**Linux/Ubuntu:**
```bash
sudo apt install -y webp

# Verify:
cwebp -version
```

**macOS:**
```bash
brew install webp

# Verify:
cwebp -version
```

---

## 📦 Project Installation

### 1. Clone/Download Project
```bash
cd D:\Project
# Ekstrak ZannWhatsAppBot atau clone dari repository
```

### 2. Install Dependencies
```bash
cd ZannWhatsAppBot
npm install
```

**Jika error saat install dependencies:**

```bash
# Clear npm cache:
npm cache clean --force

# Update npm:
npm install -g npm@latest

# Reinstall:
rm -rf node_modules package-lock.json
npm install
```

**Fix error specific packages:**

```bash
# Sharp (image processing):
npm install sharp --platform=win32 --arch=x64

# Canvas (untuk drawing):
npm install canvas --build-from-source

# Baileys (WhatsApp library):
npm install @whiskeysockets/baileys@latest
```

---

## ⚙️ Configuration

### 1. Edit Settings
```bash
# Edit file settings.json
notepad settings.json  # Windows
nano settings.json     # Linux/Mac
```

**Minimal Configuration:**
```json
{
  "identity": {
    "botName": "My Bot",
    "ownerName": "Your Name",
    "ownerNumber": "6281234567890"
  },
  "dashboard": {
    "port": 3000,
    "username": "admin",
    "password": "changeThisPassword123"
  }
}
```

### 2. Get API Keys (Optional but Recommended)

**OpenAI (for .ai command):**
- Visit: https://platform.openai.com/api-keys
- Create account & generate API key
- Add to settings.json: `apiKeys.openai`

**Google Gemini (for .gemini command):**
- Visit: https://makersuite.google.com/app/apikey
- Generate API key
- Add to settings.json: `apiKeys.gemini`

**RemoveBG (for .rembg command):**
- Visit: https://remove.bg/api
- Sign up & get API key
- Add to settings.json: `apiKeys.removebg`

**Weather API (for .weather command):**
- Visit: https://openweathermap.org/api
- Sign up & get API key
- Add to settings.json: `apiKeys.weatherapi`

---

## 🚀 Running the Bot

### Development Mode (with auto-restart)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Using PM2 (Recommended for production)
```bash
# Install PM2 globally:
npm install -g pm2

# Start bot:
npm run pm2

# PM2 Commands:
pm2 logs ZannBot    # View logs
pm2 restart ZannBot # Restart
pm2 stop ZannBot    # Stop
pm2 delete ZannBot  # Delete
pm2 list            # List all processes
pm2 monit           # Monitor resources
```

---

## 📱 Connecting WhatsApp

### 1. Open Dashboard
```
Browser: http://localhost:3000
Username: admin (from settings.json)
Password: zann2025 (from settings.json)
```

### 2. Create Bot Instance
1. Click "Create Instance"
2. Enter instance name (e.g., "MyBot")
3. Click "QR Code" button
4. Scan QR code with WhatsApp (3 dots -> Linked Devices)
5. Wait for connection (status will change to "connected")

### 3. Test Bot
Send command to bot WhatsApp number:
```
.menu
.ping
.ai Hello
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module"
```bash
npm install
```

### Error: "Port 3000 already in use"
```bash
# Edit settings.json, change port:
"dashboard": { "port": 8080 }
```

### Error: "FFmpeg not found"
```bash
# Windows:
where ffmpeg

# Linux/Mac:
which ffmpeg

# If not found, reinstall FFmpeg and add to PATH
```

### Error: "Failed to load plugin"
```bash
# Check plugin file syntax:
node plugins/tools/ping.js

# Reload plugins:
# Restart bot with npm start
```

### QR Code not showing
```bash
# 1. Make sure instance status is "disconnected"
# 2. Check browser console for errors (F12)
# 3. Restart bot and try again
```

### Bot not responding to commands
```bash
# 1. Check prefix in settings.json (default: ".")
# 2. Make sure message starts with prefix
# 3. Check logs page in dashboard
# 4. Verify feature category is enabled in Features page
```

---

## 🔒 Security Recommendations

### 1. Change Default Password
Edit `settings.json`:
```json
"dashboard": {
  "username": "your_secure_username",
  "password": "your_very_secure_password_123!"
}
```

### 2. Use Firewall
```bash
# Windows:
# Block port 3000 from external access via Windows Firewall

# Linux:
sudo ufw allow 3000/tcp  # Only if needed
```

### 3. Use Reverse Proxy (Production)
Setup Nginx/Apache untuk production environment.

---

## 📊 Performance Optimization

### 1. Increase Node.js Memory Limit
```bash
# Edit package.json scripts:
"start": "node --max-old-space-size=4096 app.js"
```

### 2. Enable Cluster Mode
```bash
# Using PM2:
pm2 start app.js -i max --name ZannBot
```

### 3. Database Optimization
```bash
# Clean old session files:
# Delete old folders in sessions/ directory
```

---

## 📈 Monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs ZannBot --lines 100
```

### Dashboard Monitoring
- CPU Usage: Real-time via dashboard
- Memory Usage: Real-time via dashboard  
- Message Count: Per instance stats
- Live Logs: Logs page in dashboard

---

## 🔄 Updating

### Update Dependencies
```bash
npm update
npm audit fix
```

### Update Baileys (WhatsApp Library)
```bash
npm install @whiskeysockets/baileys@latest
```

### Update Node.js
```bash
# Check current version:
node --version

# Update to latest:
# Windows: Download new installer
# Linux: Use nvm or package manager
# Mac: brew upgrade node
```

---

## 🆘 Getting Help

### Check Logs
```bash
# PM2 logs:
pm2 logs ZannBot

# Dashboard logs:
http://localhost:3000/logs?session=active

# Console logs:
# Check terminal where bot is running
```

### Common Issues
1. **Bot offline**: Check internet connection
2. **Commands not working**: Verify prefix and feature enabled
3. **Media not sending**: Check FFmpeg installation
4. **High CPU usage**: Reduce active instances

### Support
- Create issue on GitHub
- Check README.md for FAQ
- Review plugin documentation

---

## ✅ Installation Complete!

Your Zann WhatsApp Multi-Bot Manager is now ready to use!

**Next Steps:**
1. ✅ Access dashboard: http://localhost:3000
2. ✅ Create bot instance
3. ✅ Scan QR code
4. ✅ Test with .menu command
5. ✅ Configure API keys for advanced features
6. ✅ Explore all 200+ commands!

**Happy Botting! 🚀**
