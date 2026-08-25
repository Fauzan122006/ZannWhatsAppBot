export default {
  name: 'add',
  aliases: ['invite'],
  category: 'group',
  description: 'Add member to group',
  usage: '.add <number>',
  groupOnly: true,
  
  async execute(context) {
    const { args, sock, from, reply } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .add <number>\nExample: .add 6281234567890');
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

      if (!botIsAdmin) {
        return await reply('❌ Bot must be admin!');
      }

      const number = args[0].replace(/[^0-9]/g, '');
      const jid = number + '@s.whatsapp.net';

      await sock.groupParticipantsUpdate(from, [jid], 'add');
      await reply('✅ Successfully added!');

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
