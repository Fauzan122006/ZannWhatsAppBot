import axios from 'axios';

export default {
  name: 'google',
  aliases: ['search'],
  category: 'news',
  description: 'Search on Google',
  usage: '.google <query>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .google <query>');
    }

    const query = args.join(' ');

    try {
      await reply('🔍 Searching...');

      const response = await axios.get(`https://www.googleapis.com/customsearch/v1`, {
        params: {
          key: 'AIzaSyDummy', // Replace with actual key
          cx: '017643095683855597768:dummy', // Replace with actual CX
          q: query
        }
      });

      const results = response.data.items.slice(0, 5);
      
      if (!results || results.length === 0) {
        return await reply('❌ No results found!');
      }

      let text = `🔍 *Google Search*\nQuery: ${query}\n\n`;
      
      results.forEach((result, i) => {
        text += `${i + 1}. ${result.title}\n`;
        text += `🔗 ${result.link}\n`;
        text += `📝 ${result.snippet}\n\n`;
      });

      text += config.identity?.footerText;
      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
