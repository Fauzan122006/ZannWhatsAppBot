import { getConfig } from '../../lib/config.js';

export default {
  name: 'menu',
  aliases: ['help', 'commands'],
  category: 'tools',
  description: 'Show command list',
  usage: '.menu',
  
  async execute(context) {
    const { reply, config } = context;
    const PluginLoader = (await import('../../lib/pluginLoader.js')).default;
    const loader = PluginLoader.getInstance();
    const commands = loader.getAllCommands();

    let text = `╔══════════════════╗\n`;
    text += `║  🚀 *${config.identity.botName}* 🚀  ║\n`;
    text += `╚══════════════════╝\n\n`;
    text += `👤 Owner: ${config.identity.ownerName}\n`;
    text += `📞 Contact: ${config.identity.ownerNumber}\n`;
    text += `⚡ Prefix: ${config.behavior?.allowedPrefixes?.[0] || '.'}\n\n`;

    for (const [category, cmds] of Object.entries(commands)) {
      if (cmds.length === 0) continue;
      
      text += `╭─「 *${category.toUpperCase()}* 」\n`;
      
      for (const cmd of cmds) {
        text += `│ • ${config.behavior?.allowedPrefixes?.[0] || '.'}${cmd.name}\n`;
      }
      
      text += `╰────────────\n\n`;
    }

    text += `${config.identity.footerText}\n`;
    text += `Total Commands: ${loader.commands.size}`;

    await reply(text);
  }
};
