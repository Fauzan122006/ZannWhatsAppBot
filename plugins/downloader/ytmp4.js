import axios from 'axios';
import ytdl from 'ytdl-core';
import yts from 'yt-search';

export default {
  name: 'ytmp4',
  aliases: ['ytvideo', 'youtube'],
  category: 'downloader',
  description: 'Download YouTube video',
  usage: '.ytmp4 <url or query>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .ytmp4 <url or query>');
    }

    let url = args.join(' ');

    try {
      // Search if not URL
      if (!ytdl.validateURL(url)) {
        await reply('🔍 Searching YouTube...');
        const search = await yts(url);
        if (!search.videos.length) {
          return await reply('❌ No results found!');
        }
        url = search.videos[0].url;
      }

      await reply('⏳ Downloading video...');
      
      const info = await ytdl.getInfo(url);
      const format = ytdl.chooseFormat(info.formats, { quality: '18' });

      if (!format) {
        return await reply('❌ No suitable format found!');
      }

      const title = info.videoDetails.title;
      const thumbnail = info.videoDetails.thumbnails[0].url;

      await sock.sendMessage(from, {
        video: { url: format.url },
        caption: `🎥 *${title}*\n\n${config.identity?.footerText}`,
        jpegThumbnail: await axios.get(thumbnail, { responseType: 'arraybuffer' }).then(r => r.data)
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
