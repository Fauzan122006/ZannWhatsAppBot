import axios from 'axios';

export default {
  name: 'news',
  aliases: ['berita', 'kompas', 'detik'],
  category: 'news',
  description: 'Get latest news',
  usage: '.news [category]',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    const category = args[0] || 'general';

    try {
      const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
        params: {
          country: 'id',
          category: category,
          apiKey: config.apiKeys?.newsapi || 'DEMO'
        }
      });

      const articles = response.data.articles.slice(0, 5);
      
      if (!articles.length) {
        return await reply('❌ No news found!');
      }

      let text = `📰 *Latest News - ${category}*\n\n`;
      
      articles.forEach((article, i) => {
        text += `${i + 1}. ${article.title}\n`;
        text += `📝 ${article.description || 'No description'}\n`;
        text += `🔗 ${article.url}\n\n`;
      });

      text += config.identity?.footerText;
      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
