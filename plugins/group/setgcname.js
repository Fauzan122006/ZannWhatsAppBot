export default {
  name: 'setgcname',
  aliases: ['setname', 'changename'],
  category: 'group',
  description: 'Change group name',
  usage: '.setgcname <new name>',
  groupOnly: true,
  
  async execute(context) {
    const { args, sock, from, reply } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .setgcname <new name>');
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

      if (!botIsAdmin) {
        return await reply('❌ Bot must be admin!');
      }

      const newName = args.join(' ');
      await sock.groupUpdateSubject(from, newName);
      await reply('✅ Group name updated!');

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
