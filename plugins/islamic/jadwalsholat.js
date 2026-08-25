import axios from 'axios';
import moment from 'moment-timezone';

export default {
  name: 'jadwalsholat',
  aliases: ['sholat', 'prayertime'],
  category: 'islamic',
  description: 'Get prayer schedule',
  usage: '.jadwalsholat <city>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .jadwalsholat <city>\nExample: .jadwalsholat Jakarta');
    }

    const city = args.join(' ');

    try {
      const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=Indonesia`);
      const data = response.data.data;
      const timings = data.timings;
      const date = moment().tz('Asia/Jakarta').format('DD MMMM YYYY');

      const text = `🕌 *Jadwal Sholat*\n\n` +
                   `📍 Kota: ${city}\n` +
                   `📅 Tanggal: ${date}\n\n` +
                   `🌅 Subuh: ${timings.Fajr}\n` +
                   `🌄 Terbit: ${timings.Sunrise}\n` +
                   `☀️ Dzuhur: ${timings.Dhuhr}\n` +
                   `🌤️ Ashar: ${timings.Asr}\n` +
                   `🌆 Maghrib: ${timings.Maghrib}\n` +
                   `🌙 Isya: ${timings.Isha}\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
