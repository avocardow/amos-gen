# Task Master Integration

## Overview
Task Master AI provides structured task management for the AMOS workflow.

## Setup
```bash
npm install -g task-master-ai
task-master init
task-master models --setup
```

## Key Commands
- `task-master next` - Get next available task
- `task-master show <id>` - View task details
- `task-master set-status --id=<id> --status=done` - Mark complete
- `task-master add-task --prompt="description"` - Add new task

## Manager Integration
```bash
# Check available tasks
task-master list

# Assign task to agents
tmux send-keys -t PLANNER "MANAGER: Work on task $(task-master next --format=id)" C-m
```