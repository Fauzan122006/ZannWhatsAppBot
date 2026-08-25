import axios from 'axios';

export default {
  name: 'ssweb',
  aliases: ['ss', 'screenshot'],
  category: 'tools',
  description: 'Take website screenshot',
  usage: '.ssweb <url>',
  
  async execute(context) {
    const { args, reply, sock, from, msg, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .ssweb <url>\nExample: .ssweb https://google.com');
    }

    const url = args[0];

    try {
      await reply('⏳ Taking screenshot...');

      const ssUrl = `https://image.thum.io/get/width/1920/crop/768/maxAge/1/noanimate/${url}`;

      await sock.sendMessage(from, {
        image: { url: ssUrl },
        caption: `📸 Screenshot of ${url}\n\n${config.identity?.footerText}`
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
