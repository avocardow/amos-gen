# Simple Todo App - AMOS Test Project

## Project Objective
Create a basic command-line todo application to test the AMOS multi-agent system.

## Requirements
1. **Core Features:**
   - Add new todo items
   - List all todos
   - Mark todos as complete
   - Delete todos

2. **Technical Requirements:**
   - Node.js CLI application
   - JSON file storage
   - Simple command interface: `node todo.js add "Buy milk"`
   - Commands: add, list, complete, delete

3. **File Structure:**
   - `todo.js` - Main CLI entry point
   - `storage.js` - File operations for JSON storage
   - `commands.js` - Command implementations
   - `todos.json` - Data storage file

## Success Criteria
- Functional CLI that can add, list, complete, and delete todos
- Clean, modular code structure
- Basic error handling
- Simple test coverage

## AMOS Test Goals
- Test autonomous agent communication
- Verify agents can coordinate on a complete project
- Validate the two-command communication protocol
- Ensure agents trigger each other properly for task completion