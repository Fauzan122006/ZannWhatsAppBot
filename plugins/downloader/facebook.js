import axios from 'axios';

export default {
  name: 'facebook',
  aliases: ['fb', 'fbdl'],
  category: 'downloader',
  description: 'Download Facebook video',
  usage: '.facebook <url>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .facebook <url>');
    }

    const url = args[0];

    try {
      await reply('⏳ Downloading...');

      const response = await axios.get(`https://api.saveform.io/?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (!data.url) {
        return await reply('❌ Failed to download!');
      }

      await sock.sendMessage(from, {
        video: { url: data.url[0].url },
        caption: `📘 Facebook Downloader\n\n${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
