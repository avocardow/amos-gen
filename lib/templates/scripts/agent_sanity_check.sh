#!/usr/bin/env bash

# AMOS Agent Sanity Check
# Run this to verify agent setup and find instructions

echo "🔍 AMOS Agent Sanity Check"
echo "=========================="

# Check tmux session
if [ -n "$TMUX" ]; then
    WINDOW_NAME=$(tmux display-message -p '#W')
    echo "✅ Running in tmux window: $WINDOW_NAME"
    
    # Determine role
    case $WINDOW_NAME in
        "MANAGER")
            echo "🤖 You are the MANAGER (Gemini 2.5 Pro)"
            echo "📄 Read: .cursor/rules/amos/agent-instructions/MANAGER.mdc"
            ;;
        "PLANNER")
            echo "🧠 You are the PLANNER (Claude Opus 4)"
            echo "📄 Read: .cursor/rules/amos/agent-instructions/PLANNER.mdc"
            ;;
        "WORKER")
            echo "⚡ You are the WORKER (Claude Sonnet 4)"
            echo "📄 Read: .cursor/rules/amos/agent-instructions/WORKER.mdc"
            ;;
        *)
            echo "❌ Unknown window name: $WINDOW_NAME"
            echo "   Expected: MANAGER, PLANNER, or WORKER"
            ;;
    esac
else
    echo "❌ Not running in tmux session"
    echo "   Run: ./scripts/start_workflow.sh"
fi

echo ""
echo "📁 Essential Files:"
echo "  1. Bootstrap: .cursor/rules/amos/agent-instructions/BOOTSTRAP.mdc"
echo "  2. Your Role: .cursor/rules/amos/agent-instructions/[ROLE].mdc"
echo "  3. Project: .cursor/rules/amos/project-data/project_brief.mdc"
echo "  4. State: .cursor/rules/amos/project-data/system_state.mdc"
echo "  5. Comms: .cursor/rules/amos/communication/tmux_simple.mdc"

echo ""
echo "🚀 Next Steps:"
echo "  1. Read your role instructions"
echo "  2. Check system state"
echo "  3. Send ready signal:"
echo "     tmux send-keys -t MANAGER \"$WINDOW_NAME→MANAGER: ✅ Ready\" C-m"

echo ""
echo "💡 Remember: Output shell commands only!"