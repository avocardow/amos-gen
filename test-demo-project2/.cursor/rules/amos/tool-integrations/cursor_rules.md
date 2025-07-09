# Cursor Rules Integration

## Overview
Cursor IDE rules for consistent AI behavior across the AMOS workflow.

## Agent-Specific Rules
Each agent has dedicated rule files in `.cursor/rules/amos/agent-instructions/`

## Shared Context
- Project configuration in `project_data/`
- Tool integrations in `tool-integrations/`
- Living documentation in `living-docs/`

## Manager Integration
```bash
# Update agent context
echo "New project requirement: $REQUIREMENT" >> .cursor/rules/amos/project_data/project_brief.md

# Notify agents of context change
tmux send-keys -t PLANNER "MANAGER: Context updated, review project_brief.md" C-m
tmux send-keys -t WORKER "MANAGER: Context updated, review project_brief.md" C-m
```