export default {
  name: 'promote',
  aliases: ['admin'],
  category: 'group',
  description: 'Promote member to admin',
  usage: '.promote @user',
  groupOnly: true,
  
  async execute(context) {
    const { msg, sock, from, reply } = context;
    
    try {
      const groupMetadata = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

      if (!botIsAdmin) {
        return await reply('❌ Bot must be admin!');
      }

      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      
      if (mentioned.length === 0) {
        return await reply('❌ Tag user to promote!');
      }

      await sock.groupParticipantsUpdate(from, mentioned, 'promote');
      await reply('✅ Successfully promoted!');

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
