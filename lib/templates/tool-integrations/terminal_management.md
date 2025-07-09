# Terminal Management Guide

## Attaching to Running Agent Terminals

### View All Running Sessions

```bash
# List all tmux sessions
tmux list-sessions

# List windows in the AMOS session
tmux list-windows -t AI_Project_Workflow
```

### Attach to Monitor Agents

```bash
# Attach to the main session (shows MANAGER by default)
tmux attach-session -t AI_Project_Workflow

# Attach and go directly to specific agent window
tmux attach-session -t AI_Project_Workflow:MANAGER
tmux attach-session -t AI_Project_Workflow:PLANNER
tmux attach-session -t AI_Project_Workflow:WORKER
```

### Navigate Between Agent Windows

Once attached to the session:

```bash
# Keyboard shortcuts (while in tmux):
Ctrl+b + w          # Show window list and select
Ctrl+b + 0          # Switch to MANAGER window
Ctrl+b + 1          # Switch to PLANNER window  
Ctrl+b + 2          # Switch to WORKER window
Ctrl+b + n          # Next window
Ctrl+b + p          # Previous window
Ctrl+b + d          # Detach from session (keeps running)
```

### Monitor Multiple Agents

```bash
# Open multiple terminals and attach each to different agents
# Terminal 1:
tmux attach-session -t AI_Project_Workflow:MANAGER

# Terminal 2:
tmux attach-session -t AI_Project_Workflow:PLANNER

# Terminal 3:
tmux attach-session -t AI_Project_Workflow:WORKER
```

## Customizing Agent Initialization

### Default Initialization Commands

The startup script sends these initialization messages:

```bash
# MANAGER window:
echo 'MANAGER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/MANAGER.mdc' && clear

# PLANNER window:
echo 'PLANNER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/PLANNER.mdc' && clear

# WORKER window:
echo 'WORKER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/WORKER.mdc' && clear
```

### Customizing for Claude/Gemini

Edit `scripts/start_workflow.sh` to customize initialization:

#### Option 1: Direct AI Invocation

```bash
# For Claude Code integration (replace the echo commands):
tmux send-keys -t "$SESSION_NAME:MANAGER" "claude --model claude-3-5-sonnet-20241022" C-m
tmux send-keys -t "$SESSION_NAME:PLANNER" "claude --model claude-3-5-sonnet-20241022" C-m  
tmux send-keys -t "$SESSION_NAME:WORKER" "claude --model claude-3-5-sonnet-20241022" C-m
```

#### Option 2: Custom Wrapper Scripts

Create wrapper scripts for each agent:

```bash
# Create scripts/manager.sh
#!/bin/bash
echo "Loading MANAGER agent..."
claude --model claude-3-5-sonnet-20241022 < .cursor/rules/amos/agent-instructions/MANAGER.mdc

# Create scripts/planner.sh  
#!/bin/bash
echo "Loading PLANNER agent..."
claude --model claude-3-5-sonnet-20241022 < .cursor/rules/amos/agent-instructions/PLANNER.mdc

# Create scripts/worker.sh
#!/bin/bash
echo "Loading WORKER agent..." 
claude --model claude-3-5-sonnet-20241022 < .cursor/rules/amos/agent-instructions/WORKER.mdc
```

Then update `start_workflow.sh`:

```bash
# Send custom initialization commands
tmux send-keys -t "$SESSION_NAME:MANAGER" "./scripts/manager.sh" C-m
tmux send-keys -t "$SESSION_NAME:PLANNER" "./scripts/planner.sh" C-m
tmux send-keys -t "$SESSION_NAME:WORKER" "./scripts/worker.sh" C-m
```

#### Option 3: Environment-Specific Loading

```bash
# Set environment variables and load instructions
tmux send-keys -t "$SESSION_NAME:MANAGER" "export AGENT_ROLE=MANAGER && claude" C-m
tmux send-keys -t "$SESSION_NAME:PLANNER" "export AGENT_ROLE=PLANNER && claude" C-m
tmux send-keys -t "$SESSION_NAME:WORKER" "export AGENT_ROLE=WORKER && claude" C-m
```

### Google Gemini Integration

```bash
# For Gemini integration (if using gemini CLI):
tmux send-keys -t "$SESSION_NAME:MANAGER" "gemini --model gemini-pro" C-m
tmux send-keys -t "$SESSION_NAME:PLANNER" "gemini --model gemini-pro" C-m
tmux send-keys -t "$SESSION_NAME:WORKER" "gemini --model gemini-pro" C-m
```

### Custom Instructions per Agent

You can also customize what instructions each agent loads:

```bash
# Load specific contexts for each agent
tmux send-keys -t "$SESSION_NAME:MANAGER" "cat .cursor/rules/amos/agent-instructions/MANAGER.mdc .cursor/rules/amos/project-data/project_brief.mdc | claude" C-m

tmux send-keys -t "$SESSION_NAME:PLANNER" "cat .cursor/rules/amos/agent-instructions/PLANNER.mdc .cursor/rules/amos/living-docs/tech_stack.mdc | claude" C-m

tmux send-keys -t "$SESSION_NAME:WORKER" "cat .cursor/rules/amos/agent-instructions/WORKER.mdc .cursor/rules/amos/project-data/project_config.mdc | claude" C-m
```

## Advanced Terminal Management

### Session Management

```bash
# Kill specific agent window
tmux kill-window -t AI_Project_Workflow:PLANNER

# Recreate an agent window
tmux new-window -t AI_Project_Workflow -n "PLANNER"
tmux send-keys -t PLANNER "echo 'PLANNER restarted'" C-m

# Restart entire session
tmux kill-session -t AI_Project_Workflow
./scripts/start_workflow.sh
```

### Logging Agent Activity

```bash
# Enable logging for monitoring
tmux pipe-pane -t MANAGER 'cat >> logs/manager.log'
tmux pipe-pane -t PLANNER 'cat >> logs/planner.log' 
tmux pipe-pane -t WORKER 'cat >> logs/worker.log'
```

### Background vs Interactive Mode

```bash
# Start in background (current default)
./scripts/start_workflow.sh

# Start and immediately attach to MANAGER
./scripts/start_workflow.sh && tmux attach-session -t AI_Project_Workflow:MANAGER
```

## Debugging and Troubleshooting

### Check Agent Status

```bash
# See which windows are active
tmux list-windows -t AI_Project_Workflow

# Capture current screen content
tmux capture-pane -t MANAGER -p
tmux capture-pane -t PLANNER -p  
tmux capture-pane -t WORKER -p
```

### Restart Individual Agents

```bash
# Restart just the PLANNER agent
tmux send-keys -t PLANNER "C-c"  # Stop current process
tmux send-keys -t PLANNER "claude" C-m  # Restart Claude
```

### Session Recovery

```bash
# If session is lost, check what's running
tmux list-sessions

# Reattach to existing session
tmux attach-session -t AI_Project_Workflow

# If session is corrupted, restart
tmux kill-session -t AI_Project_Workflow
./scripts/start_workflow.sh
```

## Best Practices

### 1. Always Detach, Don't Kill

Use `Ctrl+b + d` to detach from tmux sessions rather than closing terminals. This keeps agents running.

### 2. Monitor Before Interfering

Always attach and observe agent behavior before sending manual commands.

### 3. Use Separate Terminals for Monitoring

Keep one terminal for monitoring each agent, and another for manual commands.

### 4. Log Important Sessions

Enable logging for important development sessions to review agent interactions.

### 5. Test Initialization Changes

Always test initialization script changes on a separate project first.

---

This guide ensures you can effectively monitor and control your AMOS multi-agent workflow while maintaining proper agent communication protocols.