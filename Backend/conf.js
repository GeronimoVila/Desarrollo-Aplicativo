import { existsSync, readFileSync, writeFileSync } from 'fs';
import fs from 'fs/promises';

export const conf = await loadConfig();

async function loadConfig() {
  let text;
  
  if (existsSync('./config.json')) {
    text = await fs.readFile('./config.json');
  } else {
    text = '{}';
  }
  const global = JSON.parse(text);

  if (existsSync('./config.local.json')) {
    text = await fs.readFile('./config.local.json');
  } else {
    text = '{}';
  }
  const locals = JSON.parse(text);

  return {
    ...global,
    ...locals
  };
}