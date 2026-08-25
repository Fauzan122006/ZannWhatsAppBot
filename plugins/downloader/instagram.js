import axios from 'axios';

export default {
  name: 'instagram',
  aliases: ['ig', 'igdl'],
  category: 'downloader',
  description: 'Download Instagram photo/video/reel',
  usage: '.instagram <url>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .instagram <url>');
    }

    const url = args[0];

    try {
      await reply('⏳ Downloading from Instagram...');

      const response = await axios.get(`https://api.downloadgram.com/media?url=${encodeURIComponent(url)}`);
      const data = response.data;

      if (!data.download_url) {
        return await reply('❌ Failed to download media!');
      }

      const isVideo = data.type === 'video';

      await sock.sendMessage(from, {
        [isVideo ? 'video' : 'image']: { url: data.download_url },
        caption: `📸 *Instagram Downloader*\n\n${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
