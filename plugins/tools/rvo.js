export default {
  name: 'rvo',
  aliases: ['readviewonce'],
  category: 'tools',
  description: 'Read view once message',
  usage: '.rvo (reply to view once)',
  
  async execute(context) {
    const { msg, sock, from, reply, settings } = context;
    
    const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
    const viewOnce = quoted?.imageMessage?.viewOnce || quoted?.videoMessage?.viewOnce;

    if (!viewOnce) {
      return await reply('❌ Reply to a view once message!');
    }

    try {
      const imageMsg = quoted.imageMessage;
      const videoMsg = quoted.videoMessage;

      if (imageMsg) {
        delete imageMsg.viewOnce;
        await sock.sendMessage(from, {
          image: await sock.downloadMediaMessage(imageMsg),
          caption: `👁️ View Once Image\n\n${config.identity?.footerText}`
        }, { quoted: msg });
      } else if (videoMsg) {
        delete videoMsg.viewOnce;
        await sock.sendMessage(from, {
          video: await sock.downloadMediaMessage(videoMsg),
          caption: `👁️ View Once Video\n\n${config.identity?.footerText}`
        }, { quoted: msg });
      }

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
