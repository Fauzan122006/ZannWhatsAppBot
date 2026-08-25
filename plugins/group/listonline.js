export default {
  name: 'listonline',
  aliases: ['online', 'here'],
  category: 'group',
  description: 'List online members',
  usage: '.listonline',
  groupOnly: true,
  
  async execute(context) {
    const { sock, from, reply, settings } = context;
    
    try {
      const groupMetadata = await sock.groupMetadata(from);
      const participants = groupMetadata.participants;
      
      let online = [];
      
      for (const participant of participants) {
        const status = await sock.presenceSubscribe(participant.id);
        if (status?.presences?.[participant.id]?.lastKnownPresence === 'available') {
          online.push(participant.id);
        }
      }

      if (online.length === 0) {
        return await reply('❌ No online members found!');
      }

      let text = `👥 *Online Members*\n\n`;
      online.forEach((jid, i) => {
        text += `${i + 1}. @${jid.split('@')[0]}\n`;
      });
      
      text += `\nTotal: ${online.length} members\n\n${config.identity?.footerText}`;

      await sock.sendMessage(from, {
        text,
        mentions: online
      });

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
