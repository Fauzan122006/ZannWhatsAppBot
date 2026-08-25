# 🔧 TROUBLESHOOTING & BUG FIXES

## ✅ Yang Sudah Diperbaiki

### 1. **Duplicate Command Execution** ✅ FIXED
**Problem:** Command dijalankan 2x (line 168 & 179)  
**Solution:** Hapus duplicate, hanya execute 1x via pluginLoader.execute()

### 2. **Sticker Download Media** ✅ FIXED
**Problem:** downloadMediaMessage tidak kompatibel dengan Baileys 6.7+  
**Solution:** Gunakan sock.downloadMediaMessage() langsung dengan proper message object

### 3. **Plugin Loader Instance** ✅ FIXED
**Problem:** PluginLoader.getInstance() dipanggil di constructor causing error  
**Solution:** Pindahkan ke handleMessage, panggil saat dibutuhkan

### 4. **Socket.IO Handlers** ✅ FIXED
**Problem:** Create instance tidak ada handler  
**Solution:** Tambah socket.on('createInstance') dan deleteInstance

---

## 🧪 Testing Sticker Command

### Cara Test:
1. **Start bot** (pastikan sudah running)
2. **Create instance** di dashboard
3. **Scan QR code**
4. **Kirim gambar** ke bot
5. **Reply gambar** dengan: `.sticker` atau `.s`

### Expected Result:
```
Bot: ⏳ Creating sticker...
[Bot kirim sticker dengan watermark]
```

### Jika Error:
Lihat terminal untuk error log, lalu:

1. **Error: "Reply to an image"**
   - Pastikan reply ke gambar, bukan text
   - Atau kirim gambar dengan caption `.sticker`

2. **Error: "Cannot download media"**
   - Cek koneksi internet
   - Pastikan gambar tidak expired
   - Coba kirim gambar baru

3. **Error: "wa-sticker-formatter"**
   - Run: `npm install wa-sticker-formatter@latest`
   - Restart bot

---

## 📋 Checklist Debug

### Bot Side:
- [ ] Bot running tanpa error di startup
- [ ] ✅ Loaded 118 commands
- [ ] Dashboard accessible di localhost:3001
- [ ] Instance created successfully
- [ ] QR scanned & status "connected"

### Command Side:
- [ ] Message diterima oleh bot
- [ ] Prefix detected (`.`)
- [ ] Plugin loader execute command
- [ ] No duplicate execution
- [ ] Error handling working

### Sticker Specific:
- [ ] Image/video detected
- [ ] Media downloaded successfully  
- [ ] Sticker created with watermark
- [ ] Sticker sent to chat

---

## 🔍 Debug Commands

### Check Bot Status:
```
.ping              # Test if bot responding
.runtime           # Check uptime
.botstatus         # System info
.menu              # List all commands
```

### Check Settings:
```javascript
// In terminal (while bot running):
// settings.json should have:
{
  "watermark": {
    "packname": "Zann Bot",
    "author": "@zannbot"
  }
}
```

---

## 🐛 Common Errors & Fixes

### 1. "Command tidak ditemukan"
**Cause:** Plugin tidak loaded atau typo  
**Fix:**
- Check terminal: "✅ Loaded X commands"
- Ketik: `.menu` untuk list command
- Pastikan prefix `.` (titik)

### 2. "Feature category disabled"
**Cause:** Category di-disable di settings  
**Fix:**
- Dashboard → Features → Enable "maker"
- Atau edit settings.json:
```json
{
  "features": {
    "maker": true
  }
}
```

### 3. "This command is owner-only"
**Cause:** Command restricted untuk owner  
**Fix:**
- Edit settings.json, update ownerNumber
- Atau hapus ownerOnly dari plugin

### 4. "Cannot download media"
**Cause:** Baileys compatibility issue  
**Fix:**
```javascript
// plugins/maker/sticker.js line 26:
const buffer = await sock.downloadMediaMessage(mediaMessage);
```

### 5. Bot tidak response sama sekali
**Cause:** Message handler error  
**Fix:**
1. Check terminal untuk error
2. Pastikan instance status "connected"
3. Restart bot
4. Re-scan QR

---

## 🔄 Force Reload Plugins

Jika plugin tidak update setelah edit:

### Method 1: Restart Bot
```bash
# Terminal:
Ctrl + C  # Stop
npm start # Restart
```

### Method 2: Clear Node Cache
```bash
# Stop bot, then:
rm -rf node_modules/.cache  # Linux/Mac
del /s /q node_modules\.cache  # Windows

npm start
```

---

## 📝 Enable Debug Logs

### In lib/whatsapp.js:
```javascript
// Line 110, change to:
async handleMessage(msg) {
  console.log('📨 Message received:', {
    from: msg.key.remoteJid,
    type: Object.keys(msg.message || {})[0],
    body: this.getMessageBody(msg)
  });
  
  // ... rest of code
}
```

### In lib/pluginLoader.js:
```javascript
// Line 105, add:
console.log(`🔌 Executing command: ${commandName}`);
await command.execute(context);
console.log(`✅ Command executed: ${commandName}`);
```

---

## 🛠️ Manual Test Flow

### 1. Test Basic Command
```
You: .ping
Bot: Pong! ⏱️ 0.1s
```
✅ Bot responding

### 2. Test Media Download
```
You: [Send image]
You: .sticker (reply to image)
Bot: ⏳ Creating sticker...
Bot: [Sends sticker]
```
✅ Media processing working

### 3. Test Settings
```
You: .menu
Bot: [Full command list]
```
✅ Settings loaded

### 4. Test Owner Commands
```
You: .broadcast test (if you're owner)
Bot: [Broadcasts or shows owner error]
```
✅ Permission system working

---

## 🔐 Security Checks

### Validate Owner Number:
```javascript
// settings.json:
{
  "identity": {
    "ownerNumber": "628123456789"  // WITHOUT @s.whatsapp.net
  }
}
```

### Check in code:
```javascript
// Should be:
context.sender === `${settings.identity.ownerNumber}@s.whatsapp.net`
// Example: "628123456789@s.whatsapp.net"
```

---

## 📊 Performance Monitoring

### Check Memory Usage:
```javascript
// Add to app.js after line 166:
setInterval(() => {
  const used = process.memoryUsage();
  console.log(`Memory: ${Math.round(used.heapUsed / 1024 / 1024)} MB`);
}, 60000); // Every minute
```

### Check Command Stats:
```javascript
// In WhatsAppInstance:
console.log(`Instance ${this.name}: ${this.messageCount} messages processed`);
```

---

## 🆘 Last Resort Fixes

### Complete Reinstall:
```bash
# Stop bot
# Delete node_modules
rm -rf node_modules package-lock.json

# Reinstall
npm install --legacy-peer-deps

# Restart
npm start
```

### Reset Sessions:
```bash
# Stop bot
# Delete all sessions (will need to re-scan QR)
rm -rf sessions/*

# Restart
npm start
```

### Factory Reset Settings:
```bash
# Backup first!
cp settings.json settings.backup.json

# Reset to default
# Delete and let bot recreate
rm settings.json
npm start
# Will create new settings.json with defaults
```

---

## ✅ Verification Checklist

After each fix, verify:

1. [ ] Bot starts without errors
2. [ ] Plugins loaded (check count)
3. [ ] Dashboard accessible
4. [ ] Can create instance
5. [ ] Can scan QR
6. [ ] Status shows "connected"
7. [ ] `.ping` responds
8. [ ] `.menu` shows list
9. [ ] `.sticker` works with image
10. [ ] No duplicate messages

---

## 📞 Getting Help

### Check Logs:
1. **Terminal output** - main errors
2. **Dashboard → Logs** - command logs
3. **Browser console** (F12) - frontend errors

### Report Bug:
Include:
- Error message (copy from terminal)
- Command yang digunakan
- Screenshot jika perlu
- File: settings.json (hide API keys!)

---

## 🎯 Quick Fix Summary

| Problem | Quick Fix |
|---------|-----------|
| Command 2x | Fixed in whatsapp.js line 168-182 |
| Sticker error | Fixed in sticker.js - proper downloadMediaMessage |
| Create instance | Fixed in app.js - added socket handlers |
| Plugin not found | Check features enabled in settings |
| Owner only error | Update ownerNumber in settings |
| No response | Check instance connected, check prefix |

---

**Last Updated:** 2025-12-28  
**Status:** ALL CRITICAL BUGS FIXED ✅
