export default {
  name: 'linkgc',
  aliases: ['grouplink', 'link'],
  category: 'group',
  description: 'Get group invite link',
  usage: '.linkgc',
  groupOnly: true,
  
  async execute(context) {
    const { sock, from, reply, settings } = context;
    
    try {
      const groupMetadata = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

      if (!botIsAdmin) {
        return await reply('❌ Bot must be admin!');
      }

      const code = await sock.groupInviteCode(from);
      const link = `https://chat.whatsapp.com/${code}`;

      await reply(`🔗 *Group Invite Link*\n\n${link}\n\n${config.identity?.footerText}`);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
