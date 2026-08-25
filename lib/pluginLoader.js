import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getConfig } from './config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PluginLoader {
  static instance = null;

  static getInstance() {
    if (!PluginLoader.instance) {
      PluginLoader.instance = new PluginLoader();
    }
    return PluginLoader.instance;
  }

  constructor() {
    this.commands = new Map();
    this.categories = new Map();
    this.pluginsPath = path.join(__dirname, '..', 'plugins');
  }

  async loadAllPlugins() {
    console.log('🔌 Loading plugins...');
    
    if (!fs.existsSync(this.pluginsPath)) {
      fs.mkdirSync(this.pluginsPath, { recursive: true });
    }

    const categories = fs.readdirSync(this.pluginsPath);
    
    for (const category of categories) {
      const categoryPath = path.join(this.pluginsPath, category);
      
      if (!fs.statSync(categoryPath).isDirectory()) continue;

      const files = fs.readdirSync(categoryPath).filter(f => f.endsWith('.js'));
      
      for (const file of files) {
        try {
          const filePath = path.join(categoryPath, file);
          const plugin = await import(`file://${filePath}`);
          
          if (plugin.default) {
            const cmd = plugin.default;
            
            // Register main command
            this.commands.set(cmd.name, {
              ...cmd,
              category,
              execute: cmd.execute
            });

            // Register aliases
            if (cmd.aliases) {
              for (const alias of cmd.aliases) {
                this.commands.set(alias, {
                  ...cmd,
                  category,
                  execute: cmd.execute
                });
              }
            }

            // Track category
            if (!this.categories.has(category)) {
              this.categories.set(category, []);
            }
            this.categories.get(category).push(cmd.name);
          }
        } catch (error) {
          console.error(`Error loading plugin ${category}/${file}:`, error);
        }
      }
    }

    console.log(`✅ Loaded ${this.commands.size} commands from ${this.categories.size} categories`);
  }

  async execute(commandName, context) {
    const config = getConfig();
    const command = this.commands.get(commandName);

    if (!command) return false;

    // Check if category is enabled
    if (config.features[command.category] === false) {
      await context.reply(`❌ Feature category "${command.category}" is currently disabled.`);
      return false;
    }

    // Check permissions
    if (command.ownerOnly && context.sender !== `${config.identity.ownerNumber}@s.whatsapp.net`) {
      await context.reply('❌ This command is owner-only!');
      return false;
    }

    if (command.groupOnly && !context.isGroup) {
      await context.reply('❌ This command can only be used in groups!');
      return false;
    }

    try {
      await context.react('⏳');
      await command.execute(context);
      await context.react('✅');
      return true;
    } catch (error) {
      console.error(`Command execution error (${commandName}):`, error);
      await context.react('❌');
      await context.reply(`❌ Error: ${error.message}`);
      return false;
    }
  }

  getAllCommands() {
    const result = {};
    
    for (const [category, commands] of this.categories) {
      result[category] = commands.map(cmdName => {
        const cmd = this.commands.get(cmdName);
        return {
          name: cmd.name,
          description: cmd.description,
          usage: cmd.usage,
          aliases: cmd.aliases || []
        };
      });
    }

    return result;
  }

  getCommandsByCategory(category) {
    return this.categories.get(category) || [];
  }

  getCommand(name) {
    return this.commands.get(name);
  }
}

export default PluginLoader;
