# MCP Servers Integration

## Overview
Model Context Protocol servers for enhanced AI capabilities.

## Configuration
Create `.mcp.json` in project root:
```json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"]
    }
  }
}
```

## Available MCP Tools
- Task Master: `task-master-ai`
- File operations: Built-in MCP tools
- Web search: Context-aware search tools

## Manager Integration
```bash
# Configure MCP for agents
tmux send-keys -t PLANNER "MANAGER: Use MCP task-master tools for planning" C-m
tmux send-keys -t WORKER "MANAGER: Use MCP file tools for implementation" C-m
```