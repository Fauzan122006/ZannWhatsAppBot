import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SETTINGS_PATH = path.join(__dirname, '..', 'settings.json');

export function loadSettings() {
  try {
    const data = fs.readFileSync(SETTINGS_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
}

export function saveSettings(settings) {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    throw error;
  }
}

export function getSetting(key) {
  const settings = loadSettings();
  return key.split('.').reduce((obj, k) => obj?.[k], settings);
}

export function updateSetting(key, value) {
  const settings = loadSettings();
  const keys = key.split('.');
  let current = settings;
  
  for (let i = 0; i < keys.length - 1; i++) {
    current = current[keys[i]];
  }
  
  current[keys[keys.length - 1]] = value;
  saveSettings(settings);
}
