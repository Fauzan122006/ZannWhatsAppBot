export default {
  name: 'hidetag',
  aliases: ['ht'],
  category: 'group',
  description: 'Send message with hidden tag',
  usage: '.hidetag <message>',
  groupOnly: true,
  
  async execute(context) {
    const { args, sock, from, reply, isGroup, msg } = context;
    
    if (!isGroup) {
      return await reply('❌ This command can only be used in groups!');
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants.map(p => p.id);
      
      const message = args.join(' ') || 'Hidden Tag';

      await sock.sendMessage(from, {
        text: message,
        mentions: participants
      }, { quoted: msg });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
