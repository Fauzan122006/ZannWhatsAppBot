export default {
  name: 'demote',
  aliases: ['unadmin'],
  category: 'group',
  description: 'Demote admin to member',
  usage: '.demote @user',
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
        return await reply('❌ Tag user to demote!');
      }

      await sock.groupParticipantsUpdate(from, mentioned, 'demote');
      await reply('✅ Successfully demoted!');

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
