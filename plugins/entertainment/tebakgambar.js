const tebakGambarData = new Map();

const questions = [
  { image: 'https://i.ibb.co/example1.jpg', answer: 'apel' },
  { image: 'https://i.ibb.co/example2.jpg', answer: 'jeruk' },
  // Add more questions
];

export default {
  name: 'tebakgambar',
  aliases: ['tg'],
  category: 'entertainment',
  description: 'Guess the image game',
  usage: '.tebakgambar',
  
  async execute(context) {
    const { from, sock, reply, args, body, settings } = context;

    if (args[0] === 'hint' && tebakGambarData.has(from)) {
      const game = tebakGambarData.get(from);
      const hint = game.answer.split('').map((c, i) => i % 2 === 0 ? c : '_').join('');
      return await reply(`💡 Hint: ${hint}`);
    }

    if (tebakGambarData.has(from)) {
      const game = tebakGambarData.get(from);
      if (body.toLowerCase() === game.answer.toLowerCase()) {
        tebakGambarData.delete(from);
        return await reply('🎉 Correct! +10 points');
      } else {
        return await reply('❌ Wrong answer! Try again or type .tebakgambar hint');
      }
    }

    const question = questions[Math.floor(Math.random() * questions.length)];
    tebakGambarData.set(from, { answer: question.answer, time: Date.now() });

    await sock.sendMessage(from, {
      image: { url: question.image },
      caption: `🎮 *Tebak Gambar*\n\nApa yang ada di gambar ini?\n\nKetik jawabanmu atau .tebakgambar hint\n\n${config.identity?.footerText}`
    });

    setTimeout(() => {
      if (tebakGambarData.has(from)) {
        tebakGambarData.delete(from);
        reply(`⏰ Time's up! Answer: ${question.answer}`);
      }
    }, 60000);
  }
};
