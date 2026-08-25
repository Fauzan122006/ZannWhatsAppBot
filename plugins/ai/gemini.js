import { GoogleGenerativeAI } from '@google/generative-ai';
import { getConfig } from '../../lib/config.js';

export default {
  name: 'gemini',
  aliases: ['bard', 'google'],
  category: 'ai',
  description: 'Chat with Google Gemini AI',
  usage: '.gemini <your question>',
  
  async execute(context) {
    const { args, reply, config } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .gemini <your question>');
    }

    const question = args.join(' ');

    try {
      const genAI = new GoogleGenerativeAI(config.apiKeys?.gemini);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
      
      const result = await model.generateContent(question);
      const response = await result.response;
      const text = response.text();

      await reply(`✨ *Google Gemini*\n\n${text}\n\n${config.identity?.footerText}`);
    } catch (error) {
      await reply(`❌ Error: ${error.message}`);
    }
  }
};
