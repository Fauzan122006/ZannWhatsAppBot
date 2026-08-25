export default {
  name: 'kick',
  aliases: ['remove'],
  category: 'group',
  description: 'Kick member from group',
  usage: '.kick @user',
  groupOnly: true,
  
  async execute(context) {
    const { msg, sock, from, reply, isGroup } = context;
    
    if (!isGroup) {
      return await reply('❌ This command can only be used in groups!');
    }

    try {
      // Check if bot is admin
      const groupMetadata = await sock.groupMetadata(from);
      const botNumber = sock.user.id.split(':')[0] + '@s.whatsapp.net';
      const botIsAdmin = groupMetadata.participants.find(p => p.id === botNumber)?.admin;

      if (!botIsAdmin) {
        return await reply('❌ Bot must be admin to use this command!');
      }

      // Get mentioned users
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      
      if (mentioned.length === 0) {
        return await reply('❌ Tag user to kick! Usage: .kick @user');
      }

      await sock.groupParticipantsUpdate(from, mentioned, 'remove');
      await reply(`✅ Successfully kicked ${mentioned.length} user(s)!`);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
