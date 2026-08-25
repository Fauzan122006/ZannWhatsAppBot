import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import { getConfig } from '../../lib/config.js';
import { downloadContentFromMessage } from '@whiskeysockets/baileys';

export default {
  name: 'sticker',
  aliases: ['s', 'stiker'],
  category: 'maker',
  description: 'Create sticker from image/video',
  usage: '.sticker (reply to image/video)',
  
  async execute(context) {
    const { msg, sock, from, reply } = context;
    const config = getConfig();
    
    try {
      // Get media message with proper handling
      let mediaType = null;
      let mediaMsg = null;
      
      // Check direct message media
      if (msg.message?.imageMessage) {
        mediaMsg = msg.message.imageMessage;
        mediaType = 'image';
      } else if (msg.message?.videoMessage) {
        mediaMsg = msg.message.videoMessage;
        mediaType = 'video';
      }
      
      // Check quoted/replied message
      if (!mediaMsg) {
        const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (quoted?.imageMessage) {
          mediaMsg = quoted.imageMessage;
          mediaType = 'image';
        } else if (quoted?.videoMessage) {
          mediaMsg = quoted.videoMessage;
          mediaType = 'video';
        }
      }

      if (!mediaMsg || !mediaType) {
        return await reply('❌ Reply ke gambar atau video!\n\nCara pakai:\n• Kirim gambar lalu reply dengan .sticker\n• Atau kirim gambar dengan caption .sticker');
      }

      await reply('⏳ Membuat sticker...');
      
      try {
        // Download media using stream
        const stream = await downloadContentFromMessage(mediaMsg, mediaType);
        
        // Collect chunks into buffer
        const chunks = [];
        for await (const chunk of stream) {
          chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        // Create sticker with settings
        const sticker = new Sticker(buffer, {
          pack: config.watermark?.packname || 'Zann Bot',
          author: config.watermark?.author || '@zannbot',
          type: StickerTypes.FULL,
          quality: 50
        });

        const stickerBuffer = await sticker.toBuffer();

        // Send sticker
        await sock.sendMessage(from, {
          sticker: stickerBuffer
        }, { quoted: msg });
        
      } catch (downloadError) {
        console.error('Download error:', downloadError.message);
        throw new Error('Gagal download media. Coba kirim gambar baru atau forward ulang.');
      }

    } catch (error) {
      console.error('Sticker creation error:', error);
      
      let errorMsg = '❌ Gagal buat sticker!\n\n';
      
      if (error.message.includes('decrypt')) {
        errorMsg += '⚠️ Gambar tidak bisa diproses (mungkin sudah expired)\n\nSolusi:\n✓ Kirim gambar baru (jangan forward lama)\n✓ Screenshot dan kirim ulang\n✓ Gunakan gambar dari galeri';
      } else if (error.message.includes('download')) {
        errorMsg += error.message;
      } else {
        errorMsg += `Error: ${error.message}\n\nTips:\n✓ Kirim gambar JPG/PNG fresh\n✓ Ukuran max 2MB\n✓ Video max 10 detik`;
      }
      
      await reply(errorMsg);
    }
  }
};
