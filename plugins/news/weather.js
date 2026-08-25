import axios from 'axios';

export default {
  name: 'weather',
  aliases: ['cuaca'],
  category: 'news',
  description: 'Get weather information',
  usage: '.weather <city>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .weather <city>');
    }

    const city = args.join(' ');

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: city,
          appid: config.apiKeys?.weatherapi,
          units: 'metric'
        }
      });

      const data = response.data;
      const text = `🌤️ *Weather Information*\n\n` +
                   `📍 Location: ${data.name}, ${data.sys.country}\n` +
                   `🌡️ Temperature: ${data.main.temp}°C\n` +
                   `🌡️ Feels Like: ${data.main.feels_like}°C\n` +
                   `💧 Humidity: ${data.main.humidity}%\n` +
                   `☁️ Condition: ${data.weather[0].description}\n` +
                   `💨 Wind Speed: ${data.wind.speed} m/s\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
