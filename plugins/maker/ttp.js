import axios from 'axios';

export default {
  name: 'ttp',
  aliases: ['texttopng'],
  category: 'maker',
  description: 'Create text to image',
  usage: '.ttp <text>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .ttp <text>');
    }

    const text = args.join(' ');

    try {
      await reply('⏳ Creating image...');

      const url = `https://api.lolhuman.xyz/api/ttp?apikey=DEMO&text=${encodeURIComponent(text)}`;
      
      await sock.sendMessage(from, {
        sticker: { url },
        caption: `${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
