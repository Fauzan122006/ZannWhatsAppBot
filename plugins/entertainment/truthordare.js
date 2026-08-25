const truthQuestions = [
  'Pernah bohong ke orang tua?',
  'Siapa crush kamu sekarang?',
  'Apa rahasia terbesarmu?',
  'Pernah selingkuh?',
  'Apa yang paling kamu sesali?'
];

const dareCommands = [
  'Kirim voice note teriak "Aku cinta kamu"',
  'Ganti nama WA jadi "Aku ganteng/cantik"',
  'Chat crush kamu "Halo"',
  'Posting story "Aku keren"',
  'Voice note nyanyi lagu anak-anak'
];

export default {
  name: 'truthordare',
  aliases: ['tod'],
  category: 'entertainment',
  description: 'Play truth or dare',
  usage: '.truthordare <truth/dare>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .truthordare <truth/dare>');
    }

    const choice = args[0].toLowerCase();

    if (choice === 'truth') {
      const question = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
      await reply(`🤔 *TRUTH*\n\n${question}\n\n${config.identity?.footerText}`);
    } else if (choice === 'dare') {
      const command = dareCommands[Math.floor(Math.random() * dareCommands.length)];
      await reply(`😈 *DARE*\n\n${command}\n\n${config.identity?.footerText}`);
    } else {
      await reply('❌ Choose "truth" or "dare"!');
    }
  }
};
