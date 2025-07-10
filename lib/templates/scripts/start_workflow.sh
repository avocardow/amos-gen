#!/usr/bin/env bash
SESSION_NAME="AI_Project_Workflow"

# Kill existing session
tmux kill-session -t $SESSION_NAME 2>/dev/null

echo "🚀 Starting AMOS Workflow..."

# Create session with 3 windows
tmux new-session -d -s $SESSION_NAME -n "MANAGER"
tmux new-window -t $SESSION_NAME -n "PLANNER"
tmux new-window -t $SESSION_NAME -n "WORKER"

# Color windows
tmux select-pane -t "$SESSION_NAME:MANAGER" -P 'fg=blue,bg=black'
tmux select-pane -t "$SESSION_NAME:PLANNER" -P 'fg=yellow,bg=black'
tmux select-pane -t "$SESSION_NAME:WORKER" -P 'fg=green,bg=black'

echo "📋 Initializing agents with bootstrap instructions..."

# Start agents with role-specific instructions
tmux send-keys -t "$SESSION_NAME:MANAGER" "echo '🤖 MANAGER: Read .cursor/rules/amos/agent-instructions/MANAGER.mdc'" C-m
tmux send-keys -t "$SESSION_NAME:PLANNER" "echo '🧠 PLANNER: Read .cursor/rules/amos/agent-instructions/PLANNER.mdc'" C-m
tmux send-keys -t "$SESSION_NAME:WORKER" "echo '⚡ WORKER: Read .cursor/rules/amos/agent-instructions/WORKER.mdc'" C-m

sleep 2

# Launch AI CLIs
tmux send-keys -t "$SESSION_NAME:MANAGER" "gemini --model gemini-2.5-pro-latest" C-m
tmux send-keys -t "$SESSION_NAME:PLANNER" "claude --model claude-opus-4-20250514" C-m
tmux send-keys -t "$SESSION_NAME:WORKER" "claude --model claude-sonnet-4-20250514" C-m

echo ""
echo "✅ AMOS agents started!"
echo ""
echo "📍 Essential paths for agents:"
echo "   • Bootstrap: .cursor/rules/amos/agent-instructions/BOOTSTRAP.mdc"
echo "   • Roles: .cursor/rules/amos/agent-instructions/[ROLE].mdc"
echo "   • Memory: .cursor/rules/amos/project-data/amos_config.mdc"
echo "   • Session: .cursor/rules/amos/project-data/agent_state.mdc"
echo ""
echo "🔗 Connect: tmux attach-session -t $SESSION_NAME"
echo "🚪 Switch: Ctrl+b + [0=MANAGER, 1=PLANNER, 2=WORKER]"

# Attach to session
tmux attach-session -t $SESSION_NAME