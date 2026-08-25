const games = new Map();

export default {
  name: 'tictactoe',
  aliases: ['ttt', 'xo'],
  category: 'entertainment',
  description: 'Play tic-tac-toe',
  usage: '.tictactoe <position 1-9>',
  
  async execute(context) {
    const { args, reply, from, sender, settings } = context;
    
    if (!games.has(from)) {
      // Start new game
      games.set(from, {
        board: Array(9).fill('⬜'),
        currentPlayer: sender,
        turn: 'X'
      });
      
      const text = `🎮 *Tic-Tac-Toe*\n\n` +
                   `1️⃣ 2️⃣ 3️⃣\n` +
                   `4️⃣ 5️⃣ 6️⃣\n` +
                   `7️⃣ 8️⃣ 9️⃣\n\n` +
                   `You are X! Type .tictactoe <1-9> to play\n` +
                   `Example: .tictactoe 5`;
      
      return await reply(text);
    }

    const game = games.get(from);
    
    if (args.length === 0) {
      return await reply('❌ Usage: .tictactoe <1-9>');
    }

    const pos = parseInt(args[0]) - 1;
    
    if (pos < 0 || pos > 8 || game.board[pos] !== '⬜') {
      return await reply('❌ Invalid position!');
    }

    // Player move
    game.board[pos] = '❌';
    
    if (checkWin(game.board, '❌')) {
      const board = formatBoard(game.board);
      games.delete(from);
      return await reply(`${board}\n\n🎉 You Win!\n\n${config.identity?.footerText}`);
    }

    if (game.board.every(cell => cell !== '⬜')) {
      const board = formatBoard(game.board);
      games.delete(from);
      return await reply(`${board}\n\n🤝 Draw!\n\n${config.identity?.footerText}`);
    }

    // Bot move
    const availableMoves = game.board
      .map((cell, i) => cell === '⬜' ? i : null)
      .filter(i => i !== null);
    
    const botMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    game.board[botMove] = '⭕';

    if (checkWin(game.board, '⭕')) {
      const board = formatBoard(game.board);
      games.delete(from);
      return await reply(`${board}\n\n😢 Bot Wins!\n\n${config.identity?.footerText}`);
    }

    if (game.board.every(cell => cell !== '⬜')) {
      const board = formatBoard(game.board);
      games.delete(from);
      return await reply(`${board}\n\n🤝 Draw!\n\n${config.identity?.footerText}`);
    }

    const board = formatBoard(game.board);
    await reply(`${board}\n\nYour turn!`);
  }
};

function formatBoard(board) {
  return `${board[0]} ${board[1]} ${board[2]}\n` +
         `${board[3]} ${board[4]} ${board[5]}\n` +
         `${board[6]} ${board[7]} ${board[8]}`;
}

function checkWin(board, player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6] // diagonals
  ];

  return winPatterns.some(pattern =>
    pattern.every(i => board[i] === player)
  );
}
