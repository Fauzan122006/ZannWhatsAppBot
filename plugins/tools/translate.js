export default {
  name: 'translate',
  aliases: ['tr', 'terjemah'],
  category: 'tools',
  description: 'Translate text',
  usage: '.translate <lang code> <text>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length < 2) {
      return await reply('❌ Usage: .translate <lang> <text>\nExample: .translate en Halo dunia');
    }

    const targetLang = args[0];
    const text = args.slice(1).join(' ');

    try {
      const translate = await import('translate-google');
      const result = await translate.default(text, { to: targetLang });

      await reply(`🌐 *Translator*\n\n${result}\n\n${config.identity?.footerText}`);

    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
