module.exports = {
  // Agent Instructions
  '.cursor/rules/amos/agent-instructions/MANAGER.md': `### **Identity**
You are the **Manager**, an AI project orchestrator. You do **NOT** write code. Your primary role is to communicate with the Human User, delegate tasks to the Planner and Worker agents, and manage the overall project state. You are running in a tmux pane titled "MANAGER".

### **Communication Protocol**
Your output for communication or execution **must be a complete and valid shell command**.
* **To message the Planner:**
    \`tmux send-keys -t PLANNER "MANAGER: [Your instruction]" C-m\`
* **To message the Worker:**
    \`tmux send-keys -t WORKER "MANAGER: [Your instruction]" C-m\`
* **To execute a shell command:**
    \`git commit -m "Your commit message"\`
`,

  '.cursor/rules/amos/agent-instructions/PLANNER.md': `### **Identity**
You are the **Planner**, an AI strategist. Your expertise is in understanding requirements and structuring projects. You do **NOT** write application code. You are running in a tmux pane titled "PLANNER".

### **Communication Protocol**
When you complete a request, your output **must be a complete and valid shell command** to message the Manager.
* **To message the Manager:**
    \`tmux send-keys -t MANAGER "PLANNER: [Your summary]" C-m\`
`,

  '.cursor/rules/amos/agent-instructions/WORKER.md': `### **Identity**
You are the **Worker**, an AI software engineer. Your sole focus is to execute tasks given to you by the Manager. You are running in a tmux pane titled "WORKER".

### **Communication Protocol**
When you report your status, your output **must be a complete and valid shell command** to message the Manager.
* **On Success:**
    \`tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: [task_id]"\`
* **On Failure:**
    \`tmux send-keys -t MANAGER "WORKER: TASK_FAILED: [task_id] - [Reason]"\`
`,

  // Project Data
  '.cursor/rules/amos/project_data/project_config.md': `# Project Configuration

*This file contains project-specific configuration and setup instructions.*

## Environment Setup
- Node.js version:
- Required dependencies:
- Environment variables:

## Build & Deploy
- Build command:
- Test command:
- Deploy process:
`,

  '.cursor/rules/amos/project_data/project_brief.md': `# Project Brief

*This is a placeholder for your project's high-level goals. Edit this file to provide initial context to the Manager agent.*

## Overview
Describe your project's purpose and goals here.

## Requirements
List key requirements and features.

## Success Criteria
Define what constitutes project completion.
`,

  '.cursor/rules/amos/project_data/workflow_state.md': `# Workflow State

*This file tracks the current state of the multi-agent workflow.*

## Current Phase
- [ ] Planning
- [ ] Development
- [ ] Testing
- [ ] Deployment

## Active Tasks
List current tasks being worked on by agents.

## Completed Tasks
Track completed work items.

## Blockers
Note any issues preventing progress.
`,

  // Tool Integration Templates
  '.cursor/rules/amos/tool-integrations/task_master.md': `# Task Master Integration

## Overview
Task Master AI provides structured task management for the AMOS workflow.

## Setup
\`\`\`bash
npm install -g task-master-ai
task-master init
task-master models --setup
\`\`\`

## Key Commands
- \`task-master next\` - Get next available task
- \`task-master show <id>\` - View task details
- \`task-master set-status --id=<id> --status=done\` - Mark complete
- \`task-master add-task --prompt="description"\` - Add new task

## Manager Integration
\`\`\`bash
# Check available tasks
task-master list

# Assign task to agents
tmux send-keys -t PLANNER "MANAGER: Work on task $(task-master next --format=id)" C-m
\`\`\`
`,

  '.cursor/rules/amos/tool-integrations/github_integration.md': `# GitHub Integration

## Overview
GitHub CLI integration for repository management within AMOS workflow.

## Setup
\`\`\`bash
gh auth login
gh repo clone <repository>
\`\`\`

## Key Commands
- \`gh pr create\` - Create pull request
- \`gh issue create\` - Create new issue
- \`gh pr status\` - Check PR status
- \`gh repo view\` - View repository info

## Manager Integration
\`\`\`bash
# Create PR for completed work
gh pr create --title "$(task-master show <id> --format=title)" --body "Completed task <id>"

# Assign issues to agents
tmux send-keys -t WORKER "MANAGER: Work on issue #$(gh issue create --title 'New feature' --body 'Details')" C-m
\`\`\`
`,

  '.cursor/rules/amos/tool-integrations/cursor_rules.md': `# Cursor Rules Integration

## Overview
Cursor IDE rules for consistent AI behavior across the AMOS workflow.

## Agent-Specific Rules
Each agent has dedicated rule files in \`.cursor/rules/amos/agent-instructions/\`

## Shared Context
- Project configuration in \`project_data/\`
- Tool integrations in \`tool-integrations/\`
- Living documentation in \`living-docs/\`

## Manager Integration
\`\`\`bash
# Update agent context
echo "New project requirement: $REQUIREMENT" >> .cursor/rules/amos/project_data/project_brief.md

# Notify agents of context change
tmux send-keys -t PLANNER "MANAGER: Context updated, review project_brief.md" C-m
tmux send-keys -t WORKER "MANAGER: Context updated, review project_brief.md" C-m
\`\`\`
`,

  '.cursor/rules/amos/tool-integrations/mcp_servers.md': `# MCP Servers Integration

## Overview
Model Context Protocol servers for enhanced AI capabilities.

## Configuration
Create \`.mcp.json\` in project root:
\`\`\`json
{
  "mcpServers": {
    "task-master-ai": {
      "command": "npx",
      "args": ["-y", "--package=task-master-ai", "task-master-ai"]
    }
  }
}
\`\`\`

## Available MCP Tools
- Task Master: \`task-master-ai\`
- File operations: Built-in MCP tools
- Web search: Context-aware search tools

## Manager Integration
\`\`\`bash
# Configure MCP for agents
tmux send-keys -t PLANNER "MANAGER: Use MCP task-master tools for planning" C-m
tmux send-keys -t WORKER "MANAGER: Use MCP file tools for implementation" C-m
\`\`\`
`,

  // Living Documentation Templates
  '.cursor/rules/amos/living-docs/codebase_map.md': `# Codebase Map

## Overview
This document maintains a living map of the project's codebase structure.

## Directory Structure
\`\`\`
project/
├── src/
│   ├── components/
│   ├── services/
│   ├── utils/
│   └── types/
├── tests/
├── docs/
└── scripts/
\`\`\`

## Key Files
- \`src/index.js\` - Main entry point
- \`src/config.js\` - Configuration management
- \`package.json\` - Dependencies and scripts

## Dependencies
Update as dependencies are added or removed:
- Production: 
- Development:
- Peer:

## Manager Integration
\`\`\`bash
# Update codebase map after changes
tmux send-keys -t PLANNER "MANAGER: Update codebase_map.md with new structure" C-m
\`\`\`
`,

  '.cursor/rules/amos/living-docs/roadmap.md': `# Project Roadmap

## Overview
Living roadmap tracking project milestones and progress.

## Current Phase
- [ ] Phase 1: Foundation
- [ ] Phase 2: Core Features
- [ ] Phase 3: Integration
- [ ] Phase 4: Polish & Launch

## Milestones
### Phase 1: Foundation
- [ ] Project setup
- [ ] Basic architecture
- [ ] Core dependencies

### Phase 2: Core Features
- [ ] Feature A
- [ ] Feature B
- [ ] Feature C

### Phase 3: Integration
- [ ] API integration
- [ ] Testing suite
- [ ] Documentation

### Phase 4: Polish & Launch
- [ ] Performance optimization
- [ ] Security audit
- [ ] Production deployment

## Manager Integration
\`\`\`bash
# Update roadmap progress
tmux send-keys -t PLANNER "MANAGER: Mark milestone complete in roadmap.md" C-m
\`\`\`
`,

  '.cursor/rules/amos/living-docs/tech_stack.md': `# Technology Stack

## Overview
Current technology stack and architectural decisions.

## Core Technologies
- **Runtime**: Node.js
- **Language**: JavaScript/TypeScript
- **Framework**: 
- **Database**: 
- **Testing**: 

## Development Tools
- **IDE**: Cursor
- **Version Control**: Git
- **Task Management**: Task Master AI
- **CI/CD**: 
- **Deployment**: 

## Architectural Decisions
Document key architectural choices:

### Decision 1: Framework Choice
- **Decision**: 
- **Rationale**: 
- **Alternatives Considered**: 

### Decision 2: Database Selection
- **Decision**: 
- **Rationale**: 
- **Alternatives Considered**: 

## Manager Integration
\`\`\`bash
# Update tech stack after technology changes
tmux send-keys -t PLANNER "MANAGER: Update tech_stack.md with new framework decision" C-m
\`\`\`
`,

  // Communication Templates
  '.cursor/rules/amos/communication/tmux_protocols.md': `# Tmux Communication Protocols

## Overview
Standardized communication patterns between AMOS agents.

## Message Format
All inter-agent messages follow this format:
\`\`\`
[SOURCE_AGENT]: [MESSAGE_TYPE]: [CONTENT]
\`\`\`

## Message Types
- **TASK_ASSIGN**: Manager assigns task to agent
- **TASK_COMPLETE**: Agent reports task completion
- **TASK_FAILED**: Agent reports task failure
- **STATUS_UPDATE**: Agent provides progress update
- **CONTEXT_CHANGE**: Notification of context/requirement changes
- **HELP_REQUEST**: Agent requests assistance

## Manager Communication
\`\`\`bash
# Task assignment
tmux send-keys -t PLANNER "MANAGER: TASK_ASSIGN: Plan user authentication system" C-m
tmux send-keys -t WORKER "MANAGER: TASK_ASSIGN: Implement login component" C-m

# Context updates
tmux send-keys -t PLANNER "MANAGER: CONTEXT_CHANGE: New requirement added to project_brief.md" C-m
tmux send-keys -t WORKER "MANAGER: CONTEXT_CHANGE: New requirement added to project_brief.md" C-m
\`\`\`

## Planner Communication
\`\`\`bash
# Status updates
tmux send-keys -t MANAGER "PLANNER: STATUS_UPDATE: Authentication system planned, ready for implementation" C-m
tmux send-keys -t MANAGER "PLANNER: TASK_COMPLETE: auth-system-plan" C-m
\`\`\`

## Worker Communication
\`\`\`bash
# Task completion
tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: login-component" C-m
tmux send-keys -t MANAGER "WORKER: TASK_FAILED: login-component - Missing dependency" C-m
\`\`\`
`,

  '.cursor/rules/amos/communication/doc_maintenance.md': `# Documentation Maintenance

## Overview
Protocols for maintaining living documentation across the AMOS workflow.

## Maintenance Schedule
- **Daily**: Update workflow_state.md
- **Weekly**: Review and update codebase_map.md
- **Per Feature**: Update roadmap.md milestones
- **As Needed**: Update tech_stack.md for architectural changes

## Manager Responsibilities
- Coordinate documentation updates
- Ensure consistency across agent outputs
- Assign documentation tasks to appropriate agents

## Planner Responsibilities
- Update architectural documentation
- Maintain roadmap and milestone tracking
- Review and organize project documentation

## Worker Responsibilities
- Update codebase_map.md after implementation
- Document new dependencies and configurations
- Maintain code-related documentation

## Automated Documentation
\`\`\`bash
# Script to update documentation
#!/bin/bash
echo "$(date): Updated by $1" >> .cursor/rules/amos/living-docs/last_updated.md
\`\`\`

## Manager Integration
\`\`\`bash
# Daily documentation update
tmux send-keys -t PLANNER "MANAGER: Update workflow_state.md with today's progress" C-m
tmux send-keys -t WORKER "MANAGER: Update codebase_map.md with recent changes" C-m
\`\`\`
`,

  // Scripts
  'scripts/start_workflow.sh': `#!/usr/bin/env bash
SESSION_NAME="AI_Project_Workflow"
PANE_MANAGER_TITLE="MANAGER"
PANE_PLANNER_TITLE="PLANNER"
PANE_WORKER_TITLE="WORKER"

# Check if session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
  # Create new session with three panes
  tmux new-session -d -s $SESSION_NAME -n "Agents"
  
  # Split into three panes
  tmux split-window -h -p 50
  tmux split-window -v -p 50
  
  # Configure each pane
  tmux select-pane -t 0
  tmux select-pane -T "$PANE_MANAGER_TITLE"
  tmux select-pane -P 'fg=blue,bg=black'
  
  tmux select-pane -t 1
  tmux select-pane -T "$PANE_PLANNER_TITLE"
  tmux select-pane -P 'fg=yellow,bg=black'
  
  tmux select-pane -t 2
  tmux select-pane -T "$PANE_WORKER_TITLE"
  tmux select-pane -P 'fg=green,bg=black'
  
  # Send initialization messages
  tmux send-keys -t "$SESSION_NAME:Agents.0" "echo 'MANAGER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/MANAGER.md' && clear" C-m
  tmux send-keys -t "$SESSION_NAME:Agents.1" "echo 'PLANNER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/PLANNER.md' && clear" C-m
  tmux send-keys -t "$SESSION_NAME:Agents.2" "echo 'WORKER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/WORKER.md' && clear" C-m
  
  # Select manager pane
  tmux select-pane -t 0
fi

# Attach to session
tmux attach-session -t $SESSION_NAME
`
};