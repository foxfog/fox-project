const { resolve } = require('path');
const { readDir } = require('@tauri-apps/api/fs');

async function listFilesInFolder(folderPath) {
  try {
    const fullPath = resolve(folderPath);
    const files = await readDir(fullPath);
    return files.map((file) => file.name);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listFilesInFolder,
};