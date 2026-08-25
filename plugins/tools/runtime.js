export default {
  name: 'runtime',
  aliases: ['uptime'],
  category: 'tools',
  description: 'Check bot runtime',
  usage: '.runtime',
  
  async execute(context) {
    const { reply, settings } = context;
    
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);

    const text = `⏱️ *Runtime*\n\n` +
                 `📊 ${days}d ${hours}h ${minutes}m ${seconds}s\n\n` +
                 `${config.identity?.footerText}`;

    await reply(text);
  }
};
