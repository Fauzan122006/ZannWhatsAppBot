import axios from 'axios';

export default {
  name: 'alquran',
  aliases: ['quran', 'ayat'],
  category: 'islamic',
  description: 'Get Al-Quran verse',
  usage: '.alquran <surah>:<ayat>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .alquran <surah>:<ayat>\nExample: .alquran 1:1');
    }

    const [surah, ayat] = args[0].split(':');

    try {
      const response = await axios.get(`https://api.alquran.cloud/v1/ayah/${surah}:${ayat}/editions/ar.alafasy,id.indonesian`);
      const data = response.data.data;

      const arabicText = data[0].text;
      const translation = data[1].text;
      const surahName = data[0].surah.englishName;

      const text = `📖 *Al-Quran*\n\n` +
                   `🕌 Surah: ${surahName} (${surah}:${ayat})\n\n` +
                   `${arabicText}\n\n` +
                   `📝 Terjemahan:\n${translation}\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
