import axios from 'axios';

export default {
  name: 'tiktok',
  aliases: ['tt', 'ttdl'],
  category: 'downloader',
  description: 'Download TikTok video without watermark',
  usage: '.tiktok <url>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .tiktok <url>');
    }

    const url = args[0];

    try {
      await reply('⏳ Downloading TikTok video...');

      // Using TikTok API scraper
      const response = await axios.get(`https://api.tiklydown.eu.org/api/download?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (!data.video?.noWatermark) {
        return await reply('❌ Failed to download video!');
      }

      await sock.sendMessage(from, {
        video: { url: data.video.noWatermark },
        caption: `🎵 *TikTok Downloader*\n\n` +
                 `📝 Title: ${data.title || 'N/A'}\n` +
                 `👤 Author: ${data.author?.nickname || 'N/A'}\n\n` +
                 `${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
