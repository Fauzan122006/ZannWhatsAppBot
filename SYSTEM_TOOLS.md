# 🛠️ SYSTEM TOOLS INSTALLATION GUIDE

Panduan lengkap instalasi FFmpeg, ImageMagick, dan Libwebp untuk semua platform.

---

## 📋 Table of Contents
1. [FFmpeg](#ffmpeg)
2. [ImageMagick](#imagemagick)
3. [Libwebp](#libwebp)
4. [Verification](#verification)
5. [Troubleshooting](#troubleshooting)

---

## 🎬 FFmpeg

### Windows

#### Method 1: Using Chocolatey (Recommended)
```powershell
# Install Chocolatey if not installed
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Install FFmpeg
choco install ffmpeg -y

# Verify
ffmpeg -version
```

#### Method 2: Manual Installation
1. Download dari: https://www.gyan.dev/ffmpeg/builds/
2. Pilih: **ffmpeg-git-full.7z** (versi terbaru)
3. Extract ke: `C:\ffmpeg`
4. Add to PATH:
   - Windows Key + R → `sysdm.cpl`
   - Advanced → Environment Variables
   - System Variables → PATH → Edit
   - New → `C:\ffmpeg\bin`
   - OK semua
5. Restart Command Prompt
6. Test: `ffmpeg -version`

### Linux/Ubuntu
```bash
# Update package list
sudo apt update

# Install FFmpeg
sudo apt install ffmpeg -y

# Verify
ffmpeg -version
```

### macOS
```bash
# Using Homebrew
brew install ffmpeg

# Verify
ffmpeg -version
```

### Docker
```dockerfile
FROM node:21
RUN apt-get update && apt-get install -y ffmpeg
```

---

## 🎨 ImageMagick

### Windows

#### Method 1: Using Chocolatey (Recommended)
```powershell
# Install ImageMagick
choco install imagemagick -y

# Verify
magick --version
# atau
convert --version
```

#### Method 2: Manual Installation
1. Download dari: https://imagemagick.org/script/download.php#windows
2. Pilih: **ImageMagick-7.x.x-Q16-HDRI-x64-dll.exe**
3. Install dengan opsi:
   - ✅ Add to system PATH
   - ✅ Install legacy utilities (untuk convert.exe)
4. Restart Command Prompt
5. Test: `magick --version`

**Important untuk Node.js:**
- Pastikan "Install legacy utilities" dicentang
- Ini akan install `convert.exe` yang dibutuhkan beberapa library Node.js

### Linux/Ubuntu
```bash
# Install ImageMagick
sudo apt install imagemagick -y

# Verify
convert --version
identify --version
```

### macOS
```bash
# Using Homebrew
brew install imagemagick

# Verify
convert --version
```

### Docker
```dockerfile
FROM node:21
RUN apt-get update && apt-get install -y imagemagick
```

---

## 🖼️ Libwebp

### Windows

#### Method 1: Manual Installation (Recommended)
1. Download dari: https://developers.google.com/speed/webp/download
2. Pilih: **libwebp-1.x.x-windows-x64.zip**
3. Extract ke: `C:\libwebp`
4. Add to PATH:
   - Windows Key + R → `sysdm.cpl`
   - Advanced → Environment Variables
   - System Variables → PATH → Edit
   - New → `C:\libwebp\bin`
   - OK semua
5. Restart Command Prompt
6. Test: `cwebp -version`

#### Method 2: Using MSYS2
```bash
# Install MSYS2 dari: https://www.msys2.org/
# Lalu jalankan di MSYS2 terminal:
pacman -S mingw-w64-x86_64-libwebp
```

### Linux/Ubuntu
```bash
# Install libwebp
sudo apt install webp -y

# Verify
cwebp -version
dwebp -version
```

### macOS
```bash
# Using Homebrew
brew install webp

# Verify
cwebp -version
```

### Docker
```dockerfile
FROM node:21
RUN apt-get update && apt-get install -y webp
```

---

## ✅ Verification

### Windows
```powershell
# Test semua tools
ffmpeg -version
magick --version
convert --version
cwebp -version

# Check PATH
echo $env:PATH
```

### Linux/Mac
```bash
# Test semua tools
ffmpeg -version
convert --version
cwebp -version

# Check PATH
echo $PATH

# Check which
which ffmpeg
which convert
which cwebp
```

### Test dengan Node.js
```javascript
// test-tools.js
const { execSync } = require('child_process');

console.log('Testing FFmpeg...');
try {
  const ffmpeg = execSync('ffmpeg -version').toString();
  console.log('✅ FFmpeg installed');
} catch (e) {
  console.log('❌ FFmpeg not found');
}

console.log('\nTesting ImageMagick...');
try {
  const magick = execSync('convert --version').toString();
  console.log('✅ ImageMagick installed');
} catch (e) {
  console.log('❌ ImageMagick not found');
}

console.log('\nTesting Libwebp...');
try {
  const webp = execSync('cwebp -version').toString();
  console.log('✅ Libwebp installed');
} catch (e) {
  console.log('❌ Libwebp not found');
}
```

Run test:
```bash
node test-tools.js
```

---

## 🔧 Troubleshooting

### Issue: Command not found

**Windows:**
```powershell
# Pastikan PATH sudah benar
$env:PATH -split ';' | Select-String -Pattern 'ffmpeg|imagemagick|libwebp'

# Restart PowerShell/CMD setelah install

# Test dengan full path
C:\ffmpeg\bin\ffmpeg.exe -version
```

**Linux/Mac:**
```bash
# Reload shell
source ~/.bashrc  # atau ~/.zshrc

# Check installation path
whereis ffmpeg
whereis convert
whereis cwebp
```

### Issue: Permission denied (Linux/Mac)

```bash
# Make executables
sudo chmod +x /usr/local/bin/ffmpeg
sudo chmod +x /usr/local/bin/convert
sudo chmod +x /usr/local/bin/cwebp

# Or reinstall with sudo
sudo apt install --reinstall ffmpeg imagemagick webp
```

### Issue: Node.js can't find tools

**Pastikan tools di system PATH:**

```javascript
// Cek di Node.js
const { execSync } = require('child_process');

console.log('PATH:', process.env.PATH);

try {
  console.log(execSync('ffmpeg -version').toString());
} catch (e) {
  console.error('Error:', e.message);
}
```

**Fix untuk Node.js:**

```javascript
// Di kode bot, set PATH manual jika perlu
process.env.PATH = process.env.PATH + ';C:\\ffmpeg\\bin;C:\\ImageMagick;C:\\libwebp\\bin';
```

### Issue: ImageMagick "convert" conflicts with Windows convert.exe

**Windows memiliki built-in convert.exe untuk disk conversion**

**Solution 1: Use full path**
```javascript
const convert = 'C:\\Program Files\\ImageMagick-7.x.x-Q16-HDRI\\convert.exe';
```

**Solution 2: Use magick command**
```bash
# Instead of:
convert input.jpg output.png

# Use:
magick convert input.jpg output.png
```

### Issue: Missing dependencies (Linux)

```bash
# Install all common dependencies
sudo apt install -y \
  ffmpeg \
  imagemagick \
  webp \
  libjpeg-dev \
  libpng-dev \
  libgif-dev \
  libwebp-dev \
  build-essential
```

### Issue: Canvas/Sharp npm package errors

```bash
# Install system dependencies first (Ubuntu)
sudo apt install -y \
  build-essential \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev

# Then install npm packages
npm install canvas sharp
```

---

## 🐳 Docker Installation

### Dockerfile Example
```dockerfile
FROM node:21-alpine

# Install FFmpeg
RUN apk add --no-cache ffmpeg

# Install ImageMagick
RUN apk add --no-cache imagemagick

# Install Libwebp
RUN apk add --no-cache libwebp libwebp-tools

# Install build dependencies for npm packages
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3000

# Start app
CMD ["npm", "start"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  zannbot:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./sessions:/app/sessions
      - ./database:/app/database
      - ./logs:/app/logs
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

## 📦 Package.json Scripts

Add these to your package.json for testing:

```json
{
  "scripts": {
    "test:tools": "node -e \"require('child_process').execSync('ffmpeg -version && convert --version && cwebp -version', {stdio:'inherit'})\"",
    "check:deps": "npm list ffmpeg imagemagick webp"
  }
}
```

---

## 🎯 Usage in Bot

### FFmpeg Example
```javascript
import ffmpeg from 'fluent-ffmpeg';

// Convert video to audio
ffmpeg('input.mp4')
  .toFormat('mp3')
  .on('end', () => console.log('Done'))
  .save('output.mp3');
```

### ImageMagick Example
```javascript
import { exec } from 'child_process';

// Resize image
exec('convert input.jpg -resize 500x500 output.jpg', (err) => {
  if (err) console.error(err);
  else console.log('Done');
});
```

### Libwebp Example
```javascript
import { exec } from 'child_process';

// Convert to WebP
exec('cwebp input.jpg -o output.webp', (err) => {
  if (err) console.error(err);
  else console.log('Done');
});
```

---

## 🌐 Cloud Deployment

### Heroku
```bash
# Add buildpacks
heroku buildpacks:add --index 1 heroku/nodejs
heroku buildpacks:add --index 2 https://github.com/jonathanong/heroku-buildpack-ffmpeg-latest
heroku buildpacks:add --index 3 https://github.com/retailzipline/heroku-buildpack-imagemagick
```

### AWS EC2 (Ubuntu)
```bash
# Install all tools
sudo apt update
sudo apt install -y ffmpeg imagemagick webp

# Verify
ffmpeg -version && convert --version && cwebp -version
```

### DigitalOcean / Linode
```bash
# Same as Ubuntu
sudo apt update && sudo apt install -y ffmpeg imagemagick webp
```

---

## 📊 Version Compatibility

### Recommended Versions
- FFmpeg: 4.4+ atau 5.x+
- ImageMagick: 7.x+
- Libwebp: 1.2+
- Node.js: 21+

### Check Versions
```bash
ffmpeg -version | head -n 1
convert --version | head -n 1
cwebp -version 2>&1 | head -n 1
node --version
```

---

## ✅ Final Checklist

Sebelum menjalankan bot, pastikan:

- [ ] FFmpeg installed dan di PATH
- [ ] ImageMagick installed dan di PATH
- [ ] Libwebp installed dan di PATH
- [ ] All tools versi terbaru
- [ ] Node.js 21+ installed
- [ ] npm dependencies installed
- [ ] Test script berjalan tanpa error

Test dengan:
```bash
npm run test:tools  # If script exists
# Or
ffmpeg -version && convert --version && cwebp -version && node --version
```

---

## 🆘 Still Having Issues?

1. **Restart terminal/computer** setelah install
2. **Check environment variables** di System Properties
3. **Run as administrator** (Windows)
4. **Check antivirus** tidak block executables
5. **Try Docker** jika masih bermasalah
6. **Contact support** dengan error message lengkap

---

## 📚 Additional Resources

### Documentation
- FFmpeg: https://ffmpeg.org/documentation.html
- ImageMagick: https://imagemagick.org/script/command-line-tools.php
- Libwebp: https://developers.google.com/speed/webp/docs/using

### Download Links
- FFmpeg: https://ffmpeg.org/download.html
- ImageMagick: https://imagemagick.org/script/download.php
- Libwebp: https://developers.google.com/speed/webp/download

---

**Installation Complete! Ready to run the bot! 🚀**
