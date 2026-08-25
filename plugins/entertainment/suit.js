export default {
  name: 'suit',
  aliases: ['rockpaperscissors'],
  category: 'entertainment',
  description: 'Play rock paper scissors',
  usage: '.suit <rock/paper/scissors>',
  
  async execute(context) {
    const { args, reply, settings } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .suit <rock/paper/scissors>');
    }

    const choices = ['rock', 'paper', 'scissors'];
    const userChoice = args[0].toLowerCase();

    if (!choices.includes(userChoice)) {
      return await reply('❌ Invalid choice! Use: rock, paper, or scissors');
    }

    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    
    let result;
    if (userChoice === botChoice) {
      result = '🤝 Draw!';
    } else if (
      (userChoice === 'rock' && botChoice === 'scissors') ||
      (userChoice === 'paper' && botChoice === 'rock') ||
      (userChoice === 'scissors' && botChoice === 'paper')
    ) {
      result = '🎉 You Win!';
    } else {
      result = '😢 You Lose!';
    }

    const emojis = {
      rock: '✊',
      paper: '✋',
      scissors: '✌️'
    };

    const text = `🎮 *Rock Paper Scissors*\n\n` +
                 `You: ${emojis[userChoice]} ${userChoice}\n` +
                 `Bot: ${emojis[botChoice]} ${botChoice}\n\n` +
                 `${result}\n\n` +
                 `${config.identity?.footerText}`;

    await reply(text);
  }
};
