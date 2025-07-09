# AMOS Complete Workflow Guide

## Overview

This guide walks you through the complete AMOS (Agentic Multi-Orchestration System) workflow from project generation to multi-agent development. AMOS combines task management with a three-agent AI system for efficient project development.

## Prerequisites

- Node.js 16+
- tmux installed
- Cursor IDE (recommended)
- Task Master AI: `npm install -g task-master-ai`

## Phase 1: Project Setup

### 1.1 Generate AMOS Project

```bash
# Install AMOS Generator
npm install -g amos-gen

# Generate new project
amos gen my-project
cd my-project
```

### 1.2 Initialize Task Master

```bash
# Initialize Task Master in project
task-master init

# Configure AI models (interactive setup)
task-master models --setup
```

**Required API Keys**: Set at least one of these environment variables:
- `ANTHROPIC_API_KEY` (Claude models) - **Recommended**
- `PERPLEXITY_API_KEY` (Research features) - **Highly recommended**
- `OPENAI_API_KEY` (GPT models)
- `GOOGLE_API_KEY` (Gemini models)

### 1.3 Project Planning

1. **Edit Project Brief**:
   ```bash
   # Edit project overview
   cursor .cursor/rules/amos/project-data/project_brief.mdc
   ```

2. **Create Project Requirements Document (PRD)**:
   ```bash
   # Create PRD file
   touch .taskmaster/docs/prd.txt
   # Edit with your project requirements
   cursor .taskmaster/docs/prd.txt
   ```

3. **Generate Tasks from PRD**:
   ```bash
   # Parse PRD into tasks
   task-master parse-prd .taskmaster/docs/prd.txt
   
   # Analyze task complexity
   task-master analyze-complexity --research
   
   # Expand complex tasks into subtasks
   task-master expand --all --research
   ```

## Phase 2: Agent Configuration

### 2.1 Configure Project Settings

Edit `.cursor/rules/amos/project-data/project_config.mdc` with your:
- Technology stack
- Build commands
- Testing strategy
- Coding standards
- Environment setup

### 2.2 Update Tech Stack Documentation

Edit `.cursor/rules/amos/project-data/workflow_state.mdc` with:
- Current project phase
- Active tasks
- Team structure
- Communication protocols

## Phase 3: Agent Initialization

### 3.1 Launch Multi-Agent Environment

```bash
# Start tmux session with three agents
./scripts/start_workflow.sh
```

This creates a tmux session with three panes:
- **MANAGER** (blue): Project orchestration
- **PLANNER** (yellow): Strategic planning
- **WORKER** (green): Code implementation

### 3.2 Load Agent Instructions

In each tmux pane, load the respective agent instructions:

#### MANAGER Pane (Blue)
```bash
# Load manager instructions
cursor .cursor/rules/amos/agent-instructions/MANAGER.mdc
```

#### PLANNER Pane (Yellow)
```bash
# Load planner instructions
cursor .cursor/rules/amos/agent-instructions/PLANNER.mdc
```

#### WORKER Pane (Green)
```bash
# Load worker instructions
cursor .cursor/rules/amos/agent-instructions/WORKER.mdc
```

## Phase 4: Multi-Agent Development

### 4.1 Start Development Workflow

1. **In MANAGER pane**: Get next task from Task Master
   ```bash
   task-master next
   ```

2. **Delegate to PLANNER**: Send task for planning
   ```bash
   tmux send-keys -t PLANNER "MANAGER: Plan implementation for task: [task-description]" C-m
   ```

3. **PLANNER responds**: Strategic plan sent back to MANAGER
   ```bash
   tmux send-keys -t MANAGER "PLANNER: Implementation plan ready - [plan-summary]" C-m
   ```

4. **Delegate to WORKER**: Send implementation task
   ```bash
   tmux send-keys -t WORKER "MANAGER: Implement: [specific-task]" C-m
   ```

5. **WORKER completes**: Reports back to MANAGER
   ```bash
   tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: [task-id]" C-m
   ```

6. **MANAGER marks complete**: Update Task Master
   ```bash
   task-master set-status --id=<task-id> --status=done
   ```

### 4.2 Communication Protocols

**Standard Message Format**:
```
[SOURCE_AGENT]: [MESSAGE_TYPE]: [CONTENT]
```

**Message Types**:
- `TASK_ASSIGN`: Assign work to agent
- `TASK_COMPLETE`: Report completion
- `TASK_FAILED`: Report failure
- `STATUS_UPDATE`: Progress update
- `CONTEXT_CHANGE`: Requirement changes
- `HELP_REQUEST`: Request assistance

### 4.3 Task Management Integration

**Key Commands**:
```bash
# Get next task
task-master next

# View task details
task-master show <id>

# Mark task complete
task-master set-status --id=<id> --status=done

# Add new task
task-master add-task --prompt="description"

# Expand complex task
task-master expand --id=<id> --research
```

## Phase 5: Advanced Workflows

### 5.1 Testing Agent Communication

**Test basic communication**:
```bash
# From MANAGER to PLANNER
tmux send-keys -t PLANNER "MANAGER: Test message - please acknowledge" C-m

# PLANNER should respond
tmux send-keys -t MANAGER "PLANNER: Message received and acknowledged" C-m
```

### 5.2 Error Handling

**When tasks fail**:
```bash
# WORKER reports failure
tmux send-keys -t MANAGER "WORKER: TASK_FAILED: auth-impl - Missing dependency" C-m

# MANAGER reassigns or debugs
tmux send-keys -t WORKER "MANAGER: Install missing dependency first" C-m
```

### 5.3 Documentation Maintenance

**Update living documentation**:
```bash
# Update workflow state
tmux send-keys -t PLANNER "MANAGER: Update workflow_state.mdc with current progress" C-m

# Update codebase map
tmux send-keys -t WORKER "MANAGER: Update project structure documentation" C-m
```

## Phase 6: Best Practices

### 6.1 Agent Coordination

- **Manager**: Focus on orchestration and human communication
- **Planner**: Handle architecture and strategic decisions
- **Worker**: Focus on implementation and testing

### 6.2 Task Management

- Use Task Master for all task tracking
- Break complex tasks into subtasks
- Update task status promptly
- Document implementation notes

### 6.3 Communication

- Use standardized message formats
- Be specific in task assignments
- Confirm receipt of important messages
- Escalate blockers to Manager

## Phase 7: Troubleshooting

### 7.1 Common Issues

**Task Master Configuration**:
```bash
# Check configuration
task-master models

# Reconfigure if needed
task-master models --setup
```

**Tmux Session Issues**:
```bash
# List sessions
tmux list-sessions

# Kill session if needed
tmux kill-session -t AI_Project_Workflow

# Restart
./scripts/start_workflow.sh
```

**Agent Communication**:
```bash
# Check tmux panes
tmux list-panes -t AI_Project_Workflow

# Switch to pane
tmux select-pane -t MANAGER
```

### 7.2 Performance Tips

- Use `--research` flag for complex tasks
- Expand tasks before implementation
- Keep task descriptions clear and specific
- Use MCP tools for enhanced capabilities

## Phase 8: Project Completion

### 8.1 Final Steps

1. **Complete all tasks**: Ensure no pending tasks
   ```bash
   task-master list
   ```

2. **Update documentation**: Finalize all living docs

3. **Generate reports**: Create completion summary
   ```bash
   task-master complexity-report
   ```

4. **Archive session**: Save workflow state

### 8.2 Cleanup

```bash
# Kill tmux session
tmux kill-session -t AI_Project_Workflow

# Archive project data
cp -r .taskmaster/tasks .taskmaster/archive/
```

## Conclusion

This workflow enables efficient multi-agent AI development with proper task management, clear communication protocols, and structured project organization. The combination of AMOS and Task Master provides a powerful foundation for AI-assisted development workflows.

For issues or questions, refer to:
- AMOS Generator: https://github.com/avocardow/amos-gen
- Task Master AI: https://www.npmjs.com/package/task-master-ai