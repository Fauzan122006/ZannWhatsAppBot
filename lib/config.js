import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env file
dotenv.config();

/**
 * Parse boolean from string
 */
function parseBoolean(value, defaultValue = false) {
  if (value === undefined || value === null) return defaultValue;
  return value.toLowerCase() === 'true';
}

/**
 * Parse array from comma-separated string
 */
function parseArray(value, defaultValue = []) {
  if (!value) return defaultValue;
  return value.split(',').map(v => v.trim()).filter(Boolean);
}

/**
 * Get configuration from environment variables
 */
export function getConfig() {
  return {
    identity: {
      botName: process.env.BOT_NAME || 'Zann Multi-Bot',
      ownerName: process.env.OWNER_NAME || 'Owner',
      ownerNumber: process.env.OWNER_NUMBER || '6281234567890',
      footerText: process.env.FOOTER_TEXT || '© 2025 Zann Bot'
    },
    
    watermark: {
      packname: process.env.STICKER_PACKNAME || '🚀 Zann Bot',
      author: process.env.STICKER_AUTHOR || '@zannbot',
      url: process.env.STICKER_URL || 'https://zannbot.com'
    },
    
    behavior: {
      autoRead: parseBoolean(process.env.AUTO_READ, true),
      autoTyping: parseBoolean(process.env.AUTO_TYPING, true),
      welcomeMessage: parseBoolean(process.env.WELCOME_MESSAGE, true),
      antiCall: parseBoolean(process.env.ANTI_CALL, true),
      allowedPrefixes: parseArray(process.env.ALLOWED_PREFIXES, ['.', '!', '/', '#'])
    },
    
    features: {
      ai: parseBoolean(process.env.FEATURE_AI, true),
      downloader: parseBoolean(process.env.FEATURE_DOWNLOADER, true),
      maker: parseBoolean(process.env.FEATURE_MAKER, true),
      group: parseBoolean(process.env.FEATURE_GROUP, true),
      islamic: parseBoolean(process.env.FEATURE_ISLAMIC, true),
      news: parseBoolean(process.env.FEATURE_NEWS, true),
      entertainment: parseBoolean(process.env.FEATURE_ENTERTAINMENT, true),
      tools: parseBoolean(process.env.FEATURE_TOOLS, true)
    },
    
    apiKeys: {
      openai: process.env.OPENAI_API_KEY || '',
      gemini: process.env.GEMINI_API_KEY || '',
      removebg: process.env.REMOVEBG_API_KEY || '',
      weatherapi: process.env.WEATHER_API_KEY || '',
      newsapi: process.env.NEWS_API_KEY || ''
    },
    
    dashboard: {
      port: parseInt(process.env.DASHBOARD_PORT || '3001'),
      username: process.env.DASHBOARD_USERNAME || 'admin',
      password: process.env.DASHBOARD_PASSWORD || 'admin123'
    },
    
    database: {
      enabled: parseBoolean(process.env.DB_ENABLED, false),
      type: process.env.DB_TYPE || 'json'
    },
    
    app: {
      nodeEnv: process.env.NODE_ENV || 'development',
      logLevel: process.env.LOG_LEVEL || 'info'
    }
  };
}

/**
 * Validate required environment variables
 */
export function validateConfig() {
  const required = [
    'OWNER_NUMBER',
    'DASHBOARD_USERNAME',
    'DASHBOARD_PASSWORD'
  ];
  
  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.error('❌ Missing required environment variables:');
    missing.forEach(key => console.error(`   - ${key}`));
    console.error('\n💡 Please check your .env file');
    return false;
  }
  
  return true;
}

/**
 * Create .env file if not exists
 */
export function ensureEnvFile() {
  const envPath = join(__dirname, '..', '.env');
  const envExamplePath = join(__dirname, '..', '.env.example');
  
  if (!fs.existsSync(envPath)) {
    console.log('📝 Creating .env file from example...');
    if (fs.existsSync(envExamplePath)) {
      fs.copyFileSync(envExamplePath, envPath);
      console.log('✅ .env file created! Please edit it with your settings.');
    } else {
      console.error('❌ .env.example not found!');
      return false;
    }
  }
  
  return true;
}

/**
 * Update config value (for dashboard)
 */
export function updateConfig(category, key, value) {
  const envPath = join(__dirname, '..', '.env');
  
  if (!fs.existsSync(envPath)) {
    throw new Error('.env file not found');
  }
  
  let envContent = fs.readFileSync(envPath, 'utf-8');
  const envKey = getEnvKey(category, key);
  
  if (!envKey) {
    throw new Error(`Unknown config key: ${category}.${key}`);
  }
  
  // Update or add the key
  const regex = new RegExp(`^${envKey}=.*$`, 'm');
  if (regex.test(envContent)) {
    envContent = envContent.replace(regex, `${envKey}=${value}`);
  } else {
    envContent += `\n${envKey}=${value}`;
  }
  
  fs.writeFileSync(envPath, envContent);
  
  // Reload config
  dotenv.config({ override: true });
}

/**
 * Map config path to env key
 */
function getEnvKey(category, key) {
  const mapping = {
    'identity.botName': 'BOT_NAME',
    'identity.ownerName': 'OWNER_NAME',
    'identity.ownerNumber': 'OWNER_NUMBER',
    'identity.footerText': 'FOOTER_TEXT',
    'watermark.packname': 'STICKER_PACKNAME',
    'watermark.author': 'STICKER_AUTHOR',
    'watermark.url': 'STICKER_URL',
    'behavior.autoRead': 'AUTO_READ',
    'behavior.autoTyping': 'AUTO_TYPING',
    'behavior.welcomeMessage': 'WELCOME_MESSAGE',
    'behavior.antiCall': 'ANTI_CALL',
    'apiKeys.openai': 'OPENAI_API_KEY',
    'apiKeys.gemini': 'GEMINI_API_KEY',
    'apiKeys.removebg': 'REMOVEBG_API_KEY',
    'apiKeys.weatherapi': 'WEATHER_API_KEY',
    'apiKeys.newsapi': 'NEWS_API_KEY'
  };
  
  return mapping[`${category}.${key}`];
}

// Ensure .env exists on module load
ensureEnvFile();

export default getConfig;
