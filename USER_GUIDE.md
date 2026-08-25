# 🎮 USER GUIDE - Cara Menggunakan Zann WhatsApp Bot

Panduan lengkap untuk pengguna bot WhatsApp.

---

## 📱 Cara Menggunakan Bot

### 1️⃣ Command Format

Semua command dimulai dengan **prefix** (default: `.`)

```
.commandname argument1 argument2
```

**Contoh:**
```
.menu
.ai hello world
.translate en Halo dunia
```

### 2️⃣ Multiple Prefix Support

Bot mendukung beberapa prefix:
- `.` (dot) - Default
- `!` (exclamation)
- `/` (slash)
- `#` (hash)

Bisa diatur di `settings.json` → `behavior.allowedPrefixes`

---

## 🗂️ Kategori Command

### 🧠 AI & Machine Learning

#### `.ai <pertanyaan>`
Chat dengan OpenAI GPT
```
.ai Apa itu Node.js?
.ai Buatkan puisi tentang coding
```

#### `.gemini <pertanyaan>`
Chat dengan Google Gemini AI
```
.gemini Jelaskan tentang AI
.gemini Cara belajar programming
```

#### `.rembg`
Hapus background dari gambar (reply to image)
```
1. Upload/forward gambar
2. Reply gambar dengan: .rembg
3. Bot akan kirim gambar tanpa background
```

---

### 📥 Downloader

#### `.ytmp4 <url atau query>`
Download YouTube video
```
.ytmp4 https://youtube.com/watch?v=xxxxx
.ytmp4 tutorial node js
```

#### `.ytmp3 <url atau query>`
Download YouTube audio/music
```
.ytmp3 https://youtube.com/watch?v=xxxxx
.ytmp3 lagu indonesia terbaru
```

#### `.tiktok <url>`
Download TikTok tanpa watermark
```
.tiktok https://vt.tiktok.com/xxxxx
```

#### `.instagram <url>`
Download Instagram post/reel/story
```
.instagram https://instagram.com/p/xxxxx
.ig https://instagram.com/reel/xxxxx
```

#### `.facebook <url>`
Download Facebook video
```
.facebook https://facebook.com/xxxxx/videos/xxxxx
.fb [link facebook]
```

#### `.twitter <url>`
Download Twitter/X video
```
.twitter https://twitter.com/xxxxx/status/xxxxx
.x [link twitter]
```

---

### 🎨 Maker & Graphics

#### `.sticker`
Buat sticker dari gambar/video (reply to media)
```
1. Upload/forward gambar atau video (max 10 detik)
2. Reply dengan: .sticker
3. Bot akan kirim sticker dengan watermark
```

**Alias:** `.s`, `.stiker`

#### `.qc <teks>`
Buat quote chat
```
.qc Ini adalah quote saya
.qc Terima kasih sudah menggunakan bot
```

#### `.ttp <teks>`
Convert teks ke gambar/sticker
```
.ttp Hello World
.ttp Selamat Pagi
```

---

### 👥 Group Management

**⚠️ Bot harus jadi admin untuk command ini!**

#### `.kick @user`
Kick member dari grup
```
.kick @628xxx
```

#### `.add <nomor>`
Tambah member ke grup
```
.add 628123456789
```

#### `.promote @user`
Jadikan admin
```
.promote @628xxx
```

#### `.demote @user`
Copot dari admin
```
.demote @628xxx
```

#### `.tagall [pesan]`
Tag semua member
```
.tagall Pengumuman penting!
.tagall
```

#### `.hidetag <pesan>`
Tag tersembunyi
```
.hidetag Halo semua
```

#### `.linkgc`
Dapatkan link invite grup
```
.linkgc
```

#### `.setgcname <nama baru>`
Ubah nama grup
```
.setgcname Grup Kita
```

#### `.setgcdesc <deskripsi baru>`
Ubah deskripsi grup
```
.setgcdesc Grup untuk diskusi programming
```

#### `.listonline`
List member yang online
```
.listonline
.online
```

---

### 🕌 Islamic

#### `.alquran <surah>:<ayat>`
Baca Al-Quran
```
.alquran 1:1
.alquran 2:255
.quran 18:10
```

#### `.jadwalsholat <kota>`
Jadwal sholat hari ini
```
.jadwalsholat Jakarta
.jadwalsholat Bandung
.sholat Surabaya
```

#### `.hadits`
Hadits random
```
.hadits
```

#### `.kisahnabi <nama>`
Kisah para nabi
```
.kisahnabi adam
.kisahnabi musa
.kisahnabi muhammad
```

Tersedia: adam, nuh, ibrahim, musa, isa, muhammad

---

### 📰 News & Search

#### `.google <query>`
Search di Google
```
.google cara membuat bot whatsapp
.search tutorial node js
```

#### `.weather <kota>`
Info cuaca
```
.weather Jakarta
.cuaca Bandung
```

#### `.news [kategori]`
Berita terbaru
```
.news
.news technology
.news business
.berita
```

#### `.crypto <symbol>`
Harga cryptocurrency
```
.crypto BTC
.crypto ETH
.bitcoin
```

---

### 🎮 Entertainment & Games

#### `.suit <pilihan>`
Main suit (gunting-batu-kertas)
```
.suit rock
.suit paper
.suit scissors
```

#### `.tictactoe <posisi>`
Main tic-tac-toe
```
.tictactoe          # Mulai game
.tictactoe 5        # Pilih posisi 1-9
.ttt 1
```

#### `.tebakgambar`
Tebak gambar
```
.tebakgambar        # Mulai
[jawaban]           # Ketik jawaban
.tebakgambar hint   # Minta hint
```

#### `.truthordare <truth/dare>`
Truth or dare
```
.truthordare truth
.truthordare dare
.tod truth
```

---

### 🛠️ Tools & Utilities

#### `.menu`
Lihat semua command
```
.menu
.help
.commands
```

#### `.owner`
Info kontak owner bot
```
.owner
.creator
```

#### `.translate <bahasa> <teks>`
Terjemahkan teks
```
.translate en Halo dunia
.translate id Hello world
.tr ja Good morning
```

Kode bahasa: en (English), id (Indonesia), ja (Japanese), ko (Korean), dll

#### `.ssweb <url>`
Screenshot website
```
.ssweb https://google.com
.ss https://github.com
```

#### `.calc <ekspresi>`
Kalkulator
```
.calc 2 + 2
.calc 10 * 5 + 3
.calculator (5 + 5) * 2
```

#### `.rvo`
Read view once message (reply to view once)
```
1. Reply ke gambar/video view once
2. Ketik: .rvo
3. Bot kirim tanpa view once
```

#### `.inspect <link group>`
Inspect link grup WhatsApp
```
.inspect https://chat.whatsapp.com/xxxxx
.checkgc [link]
```

#### `.shortlink <url>`
Perpendek URL
```
.shortlink https://google.com/very/long/url
.short [url panjang]
```

#### `.ping`
Test kecepatan respons bot
```
.ping
.speed
```

#### `.runtime`
Cek berapa lama bot berjalan
```
.runtime
.uptime
```

#### `.botstatus`
Status sistem bot
```
.botstatus
.status
.info
```

---

## 💡 Tips & Tricks

### 1. Command Aliases
Banyak command punya alias (singkatan):
```
.sticker = .s = .stiker
.youtube = .ytmp4 = .yt
.tiktok = .tt = .ttdl
.instagram = .ig = .igdl
```

### 2. Reply to Media
Beberapa command butuh reply ke media:
```
.sticker (reply to image/video)
.rembg (reply to image)
.rvo (reply to view once)
```

### 3. Cooldown System
Beberapa command ada cooldown untuk prevent spam:
- Heavy commands: 10-30 detik
- Light commands: 0-5 detik

### 4. Error Messages
Bot akan kasih tahu jika:
- ❌ Command salah format
- ❌ Missing arguments
- ❌ File terlalu besar
- ❌ API error
- ❌ Permission denied

---

## 🚫 Limitations

### File Size Limits
- Image: max 100MB
- Video: max 50MB
- Audio: max 20MB
- Document: max 100MB

### Rate Limits
- Broadcast: delay 3 detik per pesan
- Download: max 5 per menit per user
- AI Commands: max 10 per menit per user

### Group Features
- Bot harus admin untuk: kick, add, promote, demote
- Bot perlu permission untuk: change group name/desc

---

## ⚠️ Do's and Don'ts

### ✅ DO:
- Gunakan prefix yang benar
- Tunggu response sebelum command lagi
- Report bug ke owner
- Follow cooldown time
- Respect rate limits

### ❌ DON'T:
- Spam commands
- Send malicious content
- Abuse bot features
- Share view once content without permission
- Use for illegal activities

---

## 🆘 Troubleshooting

### Command Tidak Respon
1. Cek prefix (default: `.`)
2. Cek format command
3. Tunggu cooldown selesai
4. Pastikan bot online
5. Contact owner jika masih error

### Media Tidak Terkirim
1. Cek ukuran file
2. Cek format file (support: jpg, png, mp4, mp3, dll)
3. Cek koneksi internet
4. Coba lagi beberapa saat

### Fitur Tidak Tersedia
1. Cek di `.menu` apakah command ada
2. Cek kategori fitur aktif (tanya owner)
3. Beberapa fitur butuh API key
4. Beberapa fitur owner-only

---

## 📞 Need Help?

### Contact
- Ketik: `.owner` untuk kontak owner
- Join grup support (jika ada)
- Baca dokumentasi lengkap

### Report Bug
Jika menemukan bug:
1. Screenshot error
2. Tulis command yang digunakan
3. Kirim ke owner via `.owner`

---

## 🎯 Popular Commands

Top 10 command yang paling sering digunakan:

1. `.menu` - Lihat semua command
2. `.sticker` - Buat sticker
3. `.ytmp3` - Download musik
4. `.tiktok` - Download TikTok
5. `.ai` - Chat dengan AI
6. `.translate` - Terjemahkan
7. `.weather` - Info cuaca
8. `.tagall` - Tag all member
9. `.ping` - Test speed
10. `.owner` - Contact owner

---

## 🎓 Learning Path

### Beginner
1. Mulai dengan `.menu`
2. Coba `.ping` dan `.owner`
3. Test `.sticker` dengan gambar
4. Coba `.ai` untuk chat

### Intermediate
1. Explore downloader commands
2. Try maker commands
3. Use search commands
4. Play games

### Advanced
1. Use group management (jika admin)
2. Explore all categories
3. Combine commands
4. Request new features

---

## ✨ Pro Tips

### 1. Quick Sticker
```
Forward gambar → Reply .s
Langsung jadi sticker!
```

### 2. Music Download
```
.ytmp3 [nama lagu]
Langsung search & download!
```

### 3. Multi-language
```
.translate en [teks indonesia]
.translate id [english text]
Terjemahkan bolak-balik!
```

### 4. Group Management
```
Tag orang penting:
.hidetag @628xxx pesan penting

Broadcast ke semua:
.tagall pengumuman
```

---

## 📊 Command Statistics

Total commands tersedia: **60+**

Breakdown:
- 🧠 AI: 3 commands
- 📥 Downloader: 6 commands
- 🎨 Maker: 3 commands
- 👥 Group: 11 commands
- 🕌 Islamic: 4 commands
- 📰 News: 4 commands
- 🎮 Games: 4 commands
- 🛠️ Tools: 14 commands

---

## 🎉 Happy Botting!

Sekarang kamu sudah siap menggunakan bot!

**Remember:**
- ✅ Use responsibly
- ✅ Follow the rules
- ✅ Have fun!
- ✅ Report bugs
- ✅ Request features

**Support the bot by:**
- ⭐ Sharing to friends
- 💬 Giving feedback
- 🐛 Reporting bugs
- 💡 Suggesting features

---

**Need more info?**
- Type: `.menu` untuk command list
- Type: `.owner` untuk contact owner
- Read: Full documentation files

**Enjoy! 🚀**
