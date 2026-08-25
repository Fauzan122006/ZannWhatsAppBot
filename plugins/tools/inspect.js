export default {
  name: 'inspect',
  aliases: ['checkgc', 'gcinfo'],
  category: 'tools',
  description: 'Inspect group invite link',
  usage: '.inspect <invite link>',
  
  async execute(context) {
    const { args, reply, sock, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .inspect <group invite link>');
    }

    try {
      const code = args[0].split('chat.whatsapp.com/')[1];
      
      if (!code) {
        return await reply('❌ Invalid invite link!');
      }

      const info = await sock.groupGetInviteInfo(code);

      const text = `🔍 *Group Info*\n\n` +
                   `📝 Name: ${info.subject}\n` +
                   `👥 Members: ${info.size}\n` +
                   `📋 Description: ${info.desc || 'No description'}\n` +
                   `🔒 Restricted: ${info.restrict ? 'Yes' : 'No'}\n` +
                   `📢 Announce: ${info.announce ? 'Yes' : 'No'}\n\n` +
                   `${config.identity?.footerText}`;

      await reply(text);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
