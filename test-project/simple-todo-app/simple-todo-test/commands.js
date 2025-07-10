const storage = require('./storage');

function generateId() {
  return Date.now().toString();
}

function sanitizeDescription(description) {
  if (!description || typeof description !== 'string') {
    throw new Error('[Command] Description must be a non-empty string');
  }
  
  return description.trim().replace(/\s+/g, ' ');
}

function validateId(id) {
  if (!id || typeof id !== 'string') {
    throw new Error('[Command] ID must be provided as a string');
  }
  return id.trim();
}

function formatTodo(todo, index = null) {
  const status = todo.completed ? '✓' : '○';
  const indexStr = index !== null ? `${index + 1}. ` : '';
  const completedStr = todo.completed ? ` (completed ${new Date(todo.completedAt).toLocaleDateString()})` : '';
  
  return `${indexStr}[${todo.id}] ${status} ${todo.description}${completedStr}`;
}

async function add(args) {
  try {
    if (!args || args.length === 0) {
      throw new Error('[Command] Description required');
    }
    
    const description = sanitizeDescription(args.join(' '));
    const data = storage.loadTodos();
    
    const todo = {
      id: generateId(),
      description: description,
      completed: false,
      createdAt: new Date().toISOString(),
      completedAt: null
    };
    
    data.todos.push(todo);
    storage.saveTodos(data);
    
    console.log(`Added: ${formatTodo(todo)}`);
    console.log(`Todo added successfully with ID: ${todo.id}`);
    
    return { success: true, todo };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Hint: Use "node todo.js add <description>" to add a todo');
    return { success: false, error: error.message };
  }
}

async function list(args) {
  try {
    const data = storage.loadTodos();
    
    let filteredTodos = data.todos;
    let filterType = 'all';
    
    if (args.includes('--active')) {
      filteredTodos = data.todos.filter(todo => !todo.completed);
      filterType = 'active';
    } else if (args.includes('--completed')) {
      filteredTodos = data.todos.filter(todo => todo.completed);
      filterType = 'completed';
    }
    
    if (filteredTodos.length === 0) {
      console.log(`No ${filterType} todos found.`);
      return { success: true, todos: [] };
    }
    
    console.log(`\n${filterType.charAt(0).toUpperCase() + filterType.slice(1)} Todos (${filteredTodos.length}):`);
    console.log('─'.repeat(50));
    
    filteredTodos.forEach((todo, index) => {
      console.log(formatTodo(todo, index));
    });
    
    console.log('─'.repeat(50));
    
    const stats = {
      total: data.todos.length,
      completed: data.todos.filter(t => t.completed).length,
      active: data.todos.filter(t => !t.completed).length
    };
    
    console.log(`Total: ${stats.total} | Active: ${stats.active} | Completed: ${stats.completed}`);
    
    return { success: true, todos: filteredTodos, stats };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Hint: Use "node todo.js list" to show all todos');
    return { success: false, error: error.message };
  }
}

async function complete(args) {
  try {
    if (!args || args.length === 0) {
      throw new Error('[Command] Todo ID required');
    }
    
    const id = validateId(args[0]);
    const data = storage.loadTodos();
    
    const todoIndex = data.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error(`[Command] Todo with ID '${id}' not found`);
    }
    
    const todo = data.todos[todoIndex];
    
    if (todo.completed) {
      console.log(`Todo '${todo.description}' is already completed.`);
      return { success: true, todo, alreadyCompleted: true };
    }
    
    todo.completed = true;
    todo.completedAt = new Date().toISOString();
    
    storage.saveTodos(data);
    
    console.log(`Completed: ${formatTodo(todo)}`);
    
    return { success: true, todo };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Hint: Use "node todo.js complete <id>" to mark a todo as complete');
    return { success: false, error: error.message };
  }
}

async function deleteTodo(args) {
  try {
    if (!args || args.length === 0) {
      throw new Error('[Command] Todo ID required');
    }
    
    const id = validateId(args[0]);
    const data = storage.loadTodos();
    
    const todoIndex = data.todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) {
      throw new Error(`[Command] Todo with ID '${id}' not found`);
    }
    
    const todo = data.todos[todoIndex];
    data.todos.splice(todoIndex, 1);
    
    storage.saveTodos(data);
    
    console.log(`Deleted: ${todo.description}`);
    console.log(`Todo with ID '${id}' has been deleted.`);
    
    return { success: true, todo };
  } catch (error) {
    console.error(`Error: ${error.message}`);
    console.error('Hint: Use "node todo.js delete <id>" to delete a todo');
    return { success: false, error: error.message };
  }
}

const commands = {
  add,
  list,
  complete,
  delete: deleteTodo
};

module.exports = commands;