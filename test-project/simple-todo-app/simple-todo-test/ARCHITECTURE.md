# Simple Todo CLI Application Architecture

## Overview
A modular Node.js CLI application for managing todo items with JSON file storage. The architecture emphasizes clean separation of concerns, extensibility, and robust error handling.

## File Structure
```
simple-todo-app/
├── todo.js           # Main entry point & CLI parsing
├── storage.js        # File operations & data persistence
├── commands.js       # Command implementations
├── todos.json        # JSON data storage
├── package.json      # Project configuration
└── README.md         # Documentation
```

## Module Responsibilities

### 1. todo.js (Main Entry Point)
**Purpose**: CLI argument parsing and command routing

**Responsibilities**:
- Parse command-line arguments
- Validate command syntax
- Route to appropriate command handler
- Handle top-level errors
- Display help information

**Key Functions**:
```javascript
- main()              // Entry point
- parseArgs()         // CLI argument parsing
- showHelp()          // Display usage information
- handleError()       // Top-level error handling
```

**Dependencies**: 
- `commands.js` for command execution
- No external CLI framework (using built-in process.argv)

### 2. storage.js (Data Persistence Layer)
**Purpose**: Handle all file I/O operations and data integrity

**Responsibilities**:
- Read/write JSON file operations
- Ensure data file exists
- Handle file locks/concurrent access
- Data validation
- Backup operations (optional enhancement)

**Key Functions**:
```javascript
- loadTodos()         // Read todos from file
- saveTodos(todos)    // Write todos to file
- ensureFileExists()  // Initialize storage if needed
- validateData()      // Ensure data integrity
```

**Error Handling**:
- File not found → Create new file
- Invalid JSON → Backup and create new
- Permission errors → Clear error messages
- Disk full → Graceful failure

### 3. commands.js (Business Logic)
**Purpose**: Implement all todo operations

**Responsibilities**:
- Execute CRUD operations on todos
- Format output for display
- Validate command inputs
- Generate unique IDs for todos

**Command Implementations**:
```javascript
- add(description)    // Create new todo
- list(filter)        // Display todos (all/active/completed)
- complete(id)        // Mark todo as complete
- delete(id)          // Remove todo
```

**Todo Structure**:
```javascript
{
  id: string,         // Unique identifier (timestamp-based)
  description: string,// Todo text
  completed: boolean, // Completion status
  createdAt: string,  // ISO timestamp
  completedAt: string // ISO timestamp (null if not completed)
}
```

### 4. todos.json (Data Storage)
**Structure**:
```json
{
  "todos": [
    {
      "id": "1234567890",
      "description": "Example todo item",
      "completed": false,
      "createdAt": "2024-01-10T10:00:00Z",
      "completedAt": null
    }
  ],
  "metadata": {
    "version": "1.0.0",
    "lastModified": "2024-01-10T10:00:00Z"
  }
}
```

## Implementation Approach

### 1. Command Structure
```javascript
// Extensible command pattern
const commands = {
  add: async (args) => { /* implementation */ },
  list: async (args) => { /* implementation */ },
  complete: async (args) => { /* implementation */ },
  delete: async (args) => { /* implementation */ }
};
```

### 2. Error Handling Strategy
**Levels of Error Handling**:

1. **Storage Layer**: File I/O errors
   - Try-catch blocks around all file operations
   - Graceful fallbacks (create file if missing)
   - User-friendly error messages

2. **Command Layer**: Business logic errors
   - Validate inputs before operations
   - Check todo existence before update/delete
   - Return meaningful error codes

3. **CLI Layer**: User input errors
   - Validate command syntax
   - Show help on invalid commands
   - Clear error messages with usage hints

**Error Message Format**:
```
Error: [Category] Message
Hint: Suggested action

Example:
Error: [Storage] Cannot write to todos.json - Permission denied
Hint: Check file permissions or run with appropriate access
```

### 3. Extensibility Considerations

**Adding New Commands**:
- Add new function to commands object
- No changes needed in main parser
- Follows open/closed principle

**Storage Backends**:
- Storage.js provides abstraction layer
- Easy to swap JSON for SQLite/other
- Interface remains consistent

**Output Formats**:
- Centralized formatting in commands.js
- Easy to add JSON/CSV output options
- Configurable verbosity levels

### 4. Performance Optimizations

**For Large Todo Lists**:
- Lazy loading (pagination for list command)
- Indexed search by ID
- Efficient JSON streaming for large files
- In-memory caching with write-through

### 5. Security Considerations

**Input Validation**:
- Sanitize todo descriptions
- Validate ID formats
- Prevent path traversal in file operations
- Limited command injection surface

**File Security**:
- Restrict file permissions (user-only access)
- Validate JSON structure before parsing
- Safe handling of concurrent access

## Usage Examples

```bash
# Add a new todo
node todo.js add "Complete architecture document"

# List all todos
node todo.js list

# List only active todos
node todo.js list --active

# Complete a todo
node todo.js complete 1234567890

# Delete a todo
node todo.js delete 1234567890

# Show help
node todo.js --help
```

## Future Enhancements

1. **Categories/Tags**: Group todos by project/context
2. **Priority Levels**: High/Medium/Low priority
3. **Due Dates**: Time-based todo management
4. **Search**: Full-text search in descriptions
5. **Export/Import**: Backup and restore functionality
6. **Undo/Redo**: Command history and reversal
7. **Aliases**: Short command versions (e.g., 'a' for 'add')

## Testing Strategy

**Unit Tests**:
- Test each command in isolation
- Mock storage layer for command tests
- Test error scenarios

**Integration Tests**:
- Full command flow testing
- File I/O verification
- Concurrent operation handling

**Manual Testing Checklist**:
- [ ] All commands work with valid input
- [ ] Appropriate errors for invalid input
- [ ] File created on first run
- [ ] Data persists between runs
- [ ] Handles corrupted data file gracefully

## Conclusion

This architecture provides a clean, maintainable foundation for a todo CLI application with clear separation of concerns, robust error handling, and easy extensibility for future enhancements.