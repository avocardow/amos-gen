#!/usr/bin/env bash

# Kill existing sessions
tmux kill-session -t MANAGER 2>/dev/null
tmux kill-session -t PLANNER 2>/dev/null
tmux kill-session -t WORKER 2>/dev/null

echo "🚀 Starting AMOS Workflow..."

# Check if Claude and Gemini are available
if ! command -v claude &> /dev/null; then
    echo "❌ Claude Code not found. Please install: npm install -g @anthropic-ai/claude-code"
    exit 1
fi

if ! command -v gemini &> /dev/null; then
    echo "❌ Gemini CLI not found. Please install Gemini CLI first"
    exit 1
fi

echo "✅ AI CLI tools verified"

# Create separate sessions for each agent
tmux new-session -d -s MANAGER
tmux new-session -d -s PLANNER
tmux new-session -d -s WORKER

# Color sessions
tmux select-pane -t MANAGER -P 'fg=blue,bg=black'
tmux select-pane -t PLANNER -P 'fg=yellow,bg=black'
tmux select-pane -t WORKER -P 'fg=green,bg=black'

echo "📋 Initializing agents with bootstrap instructions..."

# Start agents with role-specific instructions
tmux send-keys -t MANAGER "echo '🤖 MANAGER: Read .cursor/rules/amos/agent-instructions/MANAGER.mdc'" C-m
tmux send-keys -t PLANNER "echo '🧠 PLANNER: Read .cursor/rules/amos/agent-instructions/PLANNER.mdc'" C-m
tmux send-keys -t WORKER "echo '⚡ WORKER: Read .cursor/rules/amos/agent-instructions/WORKER.mdc'" C-m

sleep 2

# Launch AI CLIs with permission bypassing and model selection
tmux send-keys -t MANAGER "gemini --model gemini-2.5-pro-latest --yolo" C-m
tmux send-keys -t PLANNER "claude --model opus --dangerously-skip-permissions" C-m
tmux send-keys -t WORKER "claude --model sonnet --dangerously-skip-permissions" C-m

echo ""
echo "✅ AMOS agents started!"
echo ""
echo "⚠️  FIRST TIME SETUP REQUIRED:"
echo "   If this is your first time using AMOS, you need to authenticate each agent once:"
echo "   1. tmux attach-session -t MANAGER  # Complete Gemini setup"
echo "   2. tmux attach-session -t PLANNER  # Complete Claude setup" 
echo "   3. tmux attach-session -t WORKER   # Complete Claude setup"
echo "   (Use Ctrl+b + d to detach from each session)"
echo ""
echo "📍 Essential paths for agents:"
echo "   • Bootstrap: .cursor/rules/amos/agent-instructions/BOOTSTRAP.mdc"
echo "   • Roles: .cursor/rules/amos/agent-instructions/[ROLE].mdc"
echo "   • Memory: .cursor/rules/amos/project-data/amos_config.mdc"
echo "   • Session: .cursor/rules/amos/project-data/agent_state.mdc"
echo ""
echo "🔗 Connect to agents:"
echo "   • tmux attach-session -t MANAGER"
echo "   • tmux attach-session -t PLANNER"
echo "   • tmux attach-session -t WORKER"
echo ""
echo "💬 Simple communication:"
echo "   • tmux send-keys -t MANAGER \"Hello Manager\" C-m"
echo "   • tmux send-keys -t WORKER \"MANAGER→WORKER: Task assigned\" C-m"