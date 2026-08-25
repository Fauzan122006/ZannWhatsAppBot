export default {
  name: 'tagall',
  aliases: ['everyone', 'all'],
  category: 'group',
  description: 'Tag all group members',
  usage: '.tagall <message>',
  groupOnly: true,
  
  async execute(context) {
    const { args, sock, from, reply, isGroup } = context;
    
    if (!isGroup) {
      return await reply('❌ This command can only be used in groups!');
    }

    try {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants.map(p => p.id);
      
      const message = args.join(' ') || 'Tag All Members';
      
      let text = `╔══❖ *TAG ALL* ❖══╗\n\n${message}\n\n`;
      
      for (let i = 0; i < participants.length; i++) {
        text += `${i + 1}. @${participants[i].split('@')[0]}\n`;
      }
      
      text += `\n╚═══════════════╝`;

      await sock.sendMessage(from, {
        text,
        mentions: participants
      });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
