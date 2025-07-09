#!/usr/bin/env bash
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
  tmux send-keys -t "$SESSION_NAME:Agents.0" "echo 'MANAGER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/MANAGER.mdc' && clear" C-m
  tmux send-keys -t "$SESSION_NAME:Agents.1" "echo 'PLANNER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/PLANNER.mdc' && clear" C-m
  tmux send-keys -t "$SESSION_NAME:Agents.2" "echo 'WORKER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/WORKER.mdc' && clear" C-m
  
  # Select manager pane
  tmux select-pane -t 0
fi

# Attach to session
tmux attach-session -t $SESSION_NAME