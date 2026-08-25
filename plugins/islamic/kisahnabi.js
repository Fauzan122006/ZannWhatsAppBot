const kisahNabi = {
  'adam': 'Nabi Adam AS adalah manusia pertama dan nabi pertama yang diciptakan Allah SWT...',
  'nuh': 'Nabi Nuh AS diutus untuk mengajak kaumnya kembali ke jalan yang benar...',
  'ibrahim': 'Nabi Ibrahim AS adalah bapak para nabi dan teladan dalam keimanan...',
  'musa': 'Nabi Musa AS diutus kepada Firaun dan bani Israel...',
  'isa': 'Nabi Isa AS (Yesus) adalah utusan Allah kepada bani Israel...',
  'muhammad': 'Nabi Muhammad SAW adalah nabi terakhir dan penutup para nabi...'
};

export default {
  name: 'kisahnabi',
  aliases: ['kisah'],
  category: 'islamic',
  description: 'Get story of prophets',
  usage: '.kisahnabi <nama nabi>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      const nabiList = Object.keys(kisahNabi).join(', ');
      return await reply(`❌ Usage: .kisahnabi <nama>\n\nDaftar: ${nabiList}`);
    }

    const nabiName = args[0].toLowerCase();
    const kisah = kisahNabi[nabiName];

    if (!kisah) {
      return await reply('❌ Kisah nabi tidak ditemukan!');
    }

    const text = `📖 *Kisah Nabi ${args[0]}*\n\n${kisah}\n\n${config.identity?.footerText}`;
    await reply(text);
  }
};
