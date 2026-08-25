export default {
  name: 'setgcdesc',
  aliases: ['setdesc', 'changedesc'],
  category: 'group',
  description: 'Change group description',
  usage: '.setgcdesc <new description>',
  groupOnly: true,
  
  async execute(context) {
    const { args, sock, from, reply } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .setgcdesc <new description>');
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

      if (!botIsAdmin) {
        return await reply('❌ Bot must be admin!');
      }

      const newDesc = args.join(' ');
      await sock.groupUpdateDescription(from, newDesc);
      await reply('✅ Group description updated!');

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
