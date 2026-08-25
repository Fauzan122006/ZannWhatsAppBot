import axios from 'axios';

export default {
  name: 'crypto',
  aliases: ['bitcoin', 'btc'],
  category: 'news',
  description: 'Get cryptocurrency price',
  usage: '.crypto <symbol>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .crypto <symbol>\nExample: .crypto BTC');
    }

    const symbol = args[0].toUpperCase();

    try {
      const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
        params: {
          ids: symbol.toLowerCase(),
          vs_currencies: 'usd,idr',
          include_24hr_change: true
        }
      });

      const data = response.data[symbol.toLowerCase()];
      
      if (!data) {
        return await reply('❌ Cryptocurrency not found!');
      }

      const text = `💰 *Cryptocurrency Price*\n\n` +
                   `🪙 ${symbol}\n` +
                   `💵 USD: $${data.usd.toLocaleString()}\n` +
                   `💴 IDR: Rp ${data.idr.toLocaleString()}\n` +
                   `📈 24h Change: ${data.usd_24h_change?.toFixed(2)}%\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
