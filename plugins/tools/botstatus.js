import si from 'systeminformation';
import os from 'os';

export default {
  name: 'botstatus',
  aliases: ['status', 'info'],
  category: 'tools',
  description: 'Check bot system status',
  usage: '.botstatus',
  
  async execute(context) {
    const { reply, settings } = context;

    try {
      const cpu = await si.currentLoad();
      const mem = await si.mem();
      const osInfo = await si.osInfo();

      const text = `📊 *Bot Status*\n\n` +
                   `🖥️ OS: ${osInfo.platform} ${osInfo.arch}\n` +
                   `💻 CPU: ${cpu.currentLoad.toFixed(2)}%\n` +
                   `🧠 RAM: ${((mem.used / mem.total) * 100).toFixed(2)}%\n` +
                   `📦 Total RAM: ${(mem.total / 1024 / 1024 / 1024).toFixed(2)} GB\n` +
                   `⚡ Node: ${process.version}\n` +
                   `⏱️ Uptime: ${Math.floor(process.uptime() / 3600)}h ${Math.floor((process.uptime() % 3600) / 60)}m\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
