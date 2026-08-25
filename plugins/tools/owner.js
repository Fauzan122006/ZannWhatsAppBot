import { getConfig } from '../../lib/config.js';

export default {
  name: 'owner',
  aliases: ['creator', 'developer'],
  category: 'tools',
  description: 'Show bot owner information',
  usage: '.owner',
  
  async execute(context) {
    const { sock, from, config } = context;

    const vcard = `BEGIN:VCARD\n` +
                  `VERSION:3.0\n` +
                  `FN:${config.identity.ownerName}\n` +
                  `TEL;type=CELL;type=VOICE;waid=${config.identity.ownerNumber}:+${config.identity.ownerNumber}\n` +
                  `END:VCARD`;

    await sock.sendMessage(from, {
      contacts: {
        displayName: config.identity.ownerName,
        contacts: [{ vcard }]
      }
    });
  }
};
