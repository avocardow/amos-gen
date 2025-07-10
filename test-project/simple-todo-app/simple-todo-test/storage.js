const fs = require('fs');
const path = require('path');

const TODOS_FILE = path.join(__dirname, 'todos.json');

function ensureFileExists() {
  if (!fs.existsSync(TODOS_FILE)) {
    const initialData = {
      todos: [],
      metadata: {
        version: "1.0.0",
        lastModified: new Date().toISOString()
      }
    };
    fs.writeFileSync(TODOS_FILE, JSON.stringify(initialData, null, 2));
  }
}

function loadTodos() {
  try {
    ensureFileExists();
    const data = fs.readFileSync(TODOS_FILE, 'utf8');
    const parsed = JSON.parse(data);
    
    if (!validateData(parsed)) {
      throw new Error('Invalid data structure');
    }
    
    return parsed;
  } catch (error) {
    if (error.code === 'ENOENT') {
      ensureFileExists();
      return loadTodos();
    }
    
    if (error instanceof SyntaxError) {
      const backupFile = `${TODOS_FILE}.backup.${Date.now()}`;
      fs.copyFileSync(TODOS_FILE, backupFile);
      console.error(`Error: [Storage] Invalid JSON in todos.json - backed up to ${path.basename(backupFile)}`);
      ensureFileExists();
      return loadTodos();
    }
    
    if (error.code === 'EACCES') {
      console.error('Error: [Storage] Cannot read todos.json - Permission denied');
      console.error('Hint: Check file permissions or run with appropriate access');
      process.exit(1);
    }
    
    throw new Error(`[Storage] Failed to load todos: ${error.message}`);
  }
}

function saveTodos(data) {
  try {
    if (!validateData(data)) {
      throw new Error('Invalid data structure');
    }
    
    data.metadata.lastModified = new Date().toISOString();
    
    const tempFile = `${TODOS_FILE}.tmp`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2));
    fs.renameSync(tempFile, TODOS_FILE);
    
    return true;
  } catch (error) {
    if (error.code === 'EACCES') {
      console.error('Error: [Storage] Cannot write to todos.json - Permission denied');
      console.error('Hint: Check file permissions or run with appropriate access');
      process.exit(1);
    }
    
    if (error.code === 'ENOSPC') {
      console.error('Error: [Storage] Cannot write to todos.json - Disk full');
      console.error('Hint: Free up disk space and try again');
      process.exit(1);
    }
    
    throw new Error(`[Storage] Failed to save todos: ${error.message}`);
  }
}

function validateData(data) {
  if (!data || typeof data !== 'object') {
    return false;
  }
  
  if (!Array.isArray(data.todos)) {
    return false;
  }
  
  if (!data.metadata || typeof data.metadata !== 'object') {
    return false;
  }
  
  for (const todo of data.todos) {
    if (!todo.id || typeof todo.id !== 'string') {
      return false;
    }
    if (!todo.description || typeof todo.description !== 'string') {
      return false;
    }
    if (typeof todo.completed !== 'boolean') {
      return false;
    }
    if (!todo.createdAt || typeof todo.createdAt !== 'string') {
      return false;
    }
  }
  
  return true;
}

module.exports = {
  loadTodos,
  saveTodos,
  ensureFileExists,
  validateData
};