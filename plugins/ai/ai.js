import axios from 'axios';
import { getConfig } from '../../lib/config.js';

export default {
  name: 'ai',
  aliases: ['openai', 'gpt'],
  category: 'ai',
  description: 'Chat with OpenAI GPT',
  usage: '.ai <your question>',
  
  async execute(context) {
    const { args, reply, config } = context;
    
    if (args.length === 0) {
      return await reply('❌ Usage: .ai <your question>');
    }

    const question = args.join(' ');

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: question }],
        max_tokens: 1000
      }, {
        headers: {
          'Authorization': `Bearer ${config.apiKeys?.openai}`,
          'Content-Type': 'application/json'
        }
      });

      const answer = response.data.choices[0].message.content;
      await reply(`🤖 *OpenAI GPT*\n\n${answer}\n\n${config.identity?.footerText}`);
    } catch (error) {
      await reply(`❌ Error: ${error.response?.data?.error?.message || error.message}`);
    }
  }
};
