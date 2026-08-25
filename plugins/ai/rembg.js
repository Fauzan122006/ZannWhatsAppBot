import axios from 'axios';
import FormData from 'form-data';
import { getConfig } from '../../lib/config.js';

export default {
  name: 'rembg',
  aliases: ['removebg', 'nobg'],
  category: 'ai',
  description: 'Remove background from image',
  usage: '.rembg (reply to image)',
  
  async execute(context) {
    const { msg, sock, from, reply, config } = context;
    
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    if (!quoted?.imageMessage) {
      return await reply('❌ Reply to an image with .rembg');
    }

    try {
      await reply('⏳ Removing background...');
      
      const buffer = await sock.downloadMediaMessage(quoted);
      const form = new FormData();
      form.append('image_file', buffer, 'image.jpg');
      form.append('size', 'auto');

      const response = await axios.post('https://api.remove.bg/v1.0/removebg', form, {
        headers: {
          'X-Api-Key': config.apiKeys?.removebg,
          ...form.getHeaders()
        },
        responseType: 'arraybuffer'
      });

      await sock.sendMessage(from, {
        image: response.data,
        caption: `✅ Background removed!\n\n${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
