import axios from 'axios';

export default {
  name: 'shortlink',
  aliases: ['tinyurl', 'short'],
  category: 'tools',
  description: 'Shorten URL',
  usage: '.shortlink <url>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .shortlink <url>');
    }

    const url = args[0];

    try {
      const response = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
      const shortUrl = response.data;

      await reply(`🔗 *URL Shortener*\n\nOriginal: ${url}\nShort: ${shortUrl}\n\n${config.identity?.footerText}`);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
