import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pluginsDir = path.join(__dirname, 'plugins');

function fixFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace loadSettings import
  if (content.includes("from '../../lib/settingsManager.js'")) {
    content = content.replace(
      /import.*loadSettings.*from '\.\.\/\.\.\/lib\/settingsManager\.js';/g,
      "import { getConfig } from '../../lib/config.js';"
    );
    changed = true;
  }

  // Replace const settings = loadSettings()
  if (content.includes('const settings = loadSettings()')) {
    content = content.replace(/const settings = loadSettings\(\);?/g, '');
    changed = true;
  }

  // Add config to context destructuring if settings was used
  if (content.includes('const { ') && !content.includes(', config }') && changed) {
    content = content.replace(
      /const { ([^}]+) } = context;/,
      'const { $1, config } = context;'
    );
  }

  // Replace settings.apiKeys with config.apiKeys
  content = content.replace(/settings\.apiKeys/g, 'config.apiKeys?');
  
  // Replace settings.identity with config.identity
  content = content.replace(/settings\.identity/g, 'config.identity?');
  
  // Replace settings.watermark with config.watermark
  content = content.replace(/settings\.watermark/g, 'config.watermark?');
  
  // Replace settings.behavior with config.behavior
  content = content.replace(/settings\.behavior/g, 'config.behavior?');

  if (changed || content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed: ${path.relative(__dirname, filePath)}`);
    return true;
  }
  
  return false;
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  let fixedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixedCount += scanDirectory(filePath);
    } else if (file.endsWith('.js')) {
      if (fixFile(filePath)) {
        fixedCount++;
      }
    }
  }

  return fixedCount;
}

console.log('🔧 Fixing all settings references to use config...\n');
const fixed = scanDirectory(pluginsDir);
console.log(`\n✅ Fixed ${fixed} files!`);
