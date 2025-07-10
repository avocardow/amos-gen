# AMOS Generator - Quick Start

## 🚀 **5-Minute Setup**

### 1. Install and Generate
```bash
npm install -g amos-gen
amos gen my-project
cd my-project
```

### 2. Start Agents
```bash
./scripts/start_workflow.sh
```

### 3. Monitor Agents
```bash
# Connect to individual agents
tmux attach-session -t MANAGER    # Blue session - Gemini 2.5 Pro
tmux attach-session -t PLANNER    # Yellow session - Claude Opus 4  
tmux attach-session -t WORKER     # Green session - Claude Sonnet 4

# Detach from any session: Ctrl+b + d
```

### 4. AI Models (Pre-configured)
By default, AMOS uses specialized AI models with permission bypassing:
- **MANAGER**: Gemini 2.5 Pro (`--yolo` flag enabled)
- **PLANNER**: Claude Opus 4 (`--dangerously-skip-permissions` flag enabled)
- **WORKER**: Claude Sonnet 4 (`--dangerously-skip-permissions` flag enabled)

*Agents auto-load their instructions and communicate autonomously!*

## 📋 **What You Get**

**3 Agent Sessions**:
- **MANAGER** (Gemini 2.5 Pro): Talks to humans, delegates tasks
- **PLANNER** (Claude Opus 4): Designs and plans features  
- **WORKER** (Claude Sonnet 4): Writes code and runs tests

**Agent Communication**:
```bash
# Simple session-based messaging:
tmux send-keys -t MANAGER "WORKER→MANAGER: ✅ Task complete" C-m
tmux send-keys -t PLANNER "MANAGER→PLANNER: 📋 Plan needed" C-m
```

**Project Structure**:
```
my-project/
├── .cursor/rules/amos/
│   ├── agent-instructions/      # Agent role files (.mdc)
│   ├── project-data/           # Memory & configuration
│   ├── communication/          # tmux protocols
│   └── tool-integrations/      # External tools
├── scripts/start_workflow.sh   # Start agent sessions
└── src/                        # Your code
```

## 🎯 **Next Steps**

1. **Customize Project**: Edit `.cursor/rules/amos/project-data/amos_config.mdc`
2. **Add Task Management**: Install `task-master-ai` for structured tasks
3. **Test Communication**: Agents are ready to communicate autonomously
4. **Start Building**: Begin delegating tasks via tmux messaging

## 🔧 **Common Commands**

```bash
# Check agents
tmux list-sessions

# Restart agents
tmux kill-session -t MANAGER -t PLANNER -t WORKER
./scripts/start_workflow.sh

# System check
amos check
```

## 💡 **Tips**

- **Always detach** with `Ctrl+b + d` (don't close terminals)
- **Monitor individual sessions** - each agent has its own session
- **Start simple** - test with basic messages between agents
- **Autonomous operation** - agents bypass permissions automatically

---

**Need help?** Check `.cursor/rules/amos/tool-integrations/terminal_management.md` for advanced usage.

**Ready to build?** Your multi-agent development environment is running! 🎉