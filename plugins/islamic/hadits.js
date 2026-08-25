import axios from 'axios';

export default {
  name: 'hadits',
  aliases: ['hadist'],
  category: 'islamic',
  description: 'Get random hadits',
  usage: '.hadits',
  
  async execute(context) {
    const { reply, settings } = context;

    try {
      const response = await axios.get('https://api.hadith.gading.dev/books/muslim?range=1-300');
      const hadiths = response.data.data.hadiths;
      const random = hadiths[Math.floor(Math.random() * hadiths.length)];

      const text = `📚 *Hadits*\n\n` +
                   `${random.arab}\n\n` +
                   `📝 Terjemahan:\n${random.id}\n\n` +
                   `📖 ${response.data.data.name} - ${random.number}\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
