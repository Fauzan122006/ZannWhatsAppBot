export default {
  name: 'ping',
  aliases: ['speed', 'test'],
  category: 'tools',
  description: 'Check bot response time',
  usage: '.ping',
  
  async execute(context) {
    const { reply, settings } = context;
    
    const start = Date.now();
    await reply('🏓 Pinging...');
    const end = Date.now();
    const ping = end - start;

    await reply(`🏓 *Pong!*\n\nResponse Time: ${ping}ms\n\n${config.identity?.footerText}`);
  }
};
