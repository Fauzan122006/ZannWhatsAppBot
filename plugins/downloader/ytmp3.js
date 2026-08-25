import ytdl from 'ytdl-core';
import yts from 'yt-search';

export default {
  name: 'ytmp3',
  aliases: ['ytaudio', 'yta'],
  category: 'downloader',
  description: 'Download YouTube audio',
  usage: '.ytmp3 <url or query>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .ytmp3 <url or query>');
    }

    let url = args.join(' ');

    try {
      if (!ytdl.validateURL(url)) {
        await reply('🔍 Searching...');
        const search = await yts(url);
        if (!search.videos.length) {
          return await reply('❌ No results found!');
        }
        url = search.videos[0].url;
      }

      await reply('⏳ Downloading audio...');
      
      const info = await ytdl.getInfo(url);
      const audioFormat = ytdl.chooseFormat(info.formats, { quality: 'highestaudio' });

      await sock.sendMessage(from, {
        audio: { url: audioFormat.url },
        mimetype: 'audio/mp4',
        fileName: `${info.videoDetails.title}.mp3`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
