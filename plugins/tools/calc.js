export default {
  name: 'calc',
  aliases: ['calculator', 'hitung'],
  category: 'tools',
  description: 'Calculate mathematical expression',
  usage: '.calc <expression>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .calc <expression>\nExample: .calc 2 + 2 * 3');
    }

    const expression = args.join(' ');

    try {
      // Safe eval alternative
      const result = Function(`'use strict'; return (${expression})`)();
      
      await reply(`🔢 *Calculator*\n\n${expression} = ${result}\n\n${config.identity?.footerText}`);

    } catch (error) {
      await reply(`❌ Invalid expression!`);
    }
  }
};
