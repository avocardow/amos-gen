#!/usr/bin/env bash
SESSION_NAME="AI_Project_Workflow"

# Check if session already exists
tmux has-session -t $SESSION_NAME 2>/dev/null

if [ $? != 0 ]; then
  # Create new session with MANAGER window
  tmux new-session -d -s $SESSION_NAME -n "MANAGER"
  tmux select-window -t "$SESSION_NAME:MANAGER"
  tmux select-pane -P 'fg=blue,bg=black'
  
  # Create PLANNER window
  tmux new-window -t $SESSION_NAME -n "PLANNER"
  tmux select-window -t "$SESSION_NAME:PLANNER"
  tmux select-pane -P 'fg=yellow,bg=black'
  
  # Create WORKER window
  tmux new-window -t $SESSION_NAME -n "WORKER"
  tmux select-window -t "$SESSION_NAME:WORKER"
  tmux select-pane -P 'fg=green,bg=black'
  
  # Send initialization messages
  tmux send-keys -t "$SESSION_NAME:MANAGER" "echo 'MANAGER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/MANAGER.mdc' && clear" C-m
  tmux send-keys -t "$SESSION_NAME:PLANNER" "echo 'PLANNER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/PLANNER.mdc' && clear" C-m
  tmux send-keys -t "$SESSION_NAME:WORKER" "echo 'WORKER Initialized. Feed me my instructions from ./.cursor/rules/amos/agent-instructions/WORKER.mdc' && clear" C-m
  
  # Select manager window
  tmux select-window -t "$SESSION_NAME:MANAGER"
fi

# Attach to session
tmux attach-session -t $SESSION_NAME