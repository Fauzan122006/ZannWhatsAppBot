import axios from 'axios';

export default {
  name: 'twitter',
  aliases: ['tw', 'twdl', 'x'],
  category: 'downloader',
  description: 'Download Twitter/X video',
  usage: '.twitter <url>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .twitter <url>');
    }

    const url = args[0];

    try {
      await reply('⏳ Downloading...');

      const response = await axios.get(`https://api.twttrapi.p.rapidapi.com/download?url=${encodeURIComponent(url)}`, {
        headers: {
          'X-RapidAPI-Key': 'DEMO',
          'X-RapidAPI-Host': 'api.twttrapi.p.rapidapi.com'
        }
      });

      const videoUrl = response.data.download_url;

      await sock.sendMessage(from, {
        video: { url: videoUrl },
        caption: `🐦 Twitter/X Downloader\n\n${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
