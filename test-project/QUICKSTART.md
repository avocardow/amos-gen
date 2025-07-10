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
# In a new terminal
tmux attach-session -t AI_Project_Workflow

# Navigate: Ctrl+b + 0/1/2 (Manager/Planner/Worker)
# Detach: Ctrl+b + d
```

### 4. AI Models (Pre-configured)
By default, AMOS uses specialized AI models:
- **MANAGER**: Gemini 2.5 Pro (gemini --model gemini-2.5-pro-latest)
- **PLANNER**: Claude Opus 4 (claude --model claude-3-opus-20240229)  
- **WORKER**: Claude Sonnet 4 (claude --model claude-3-5-sonnet-20241022)

*Agents auto-load their instructions and start immediately!*

## 📋 **What You Get**

**3 Agent Windows**:
- **MANAGER** (Gemini 2.5 Pro): Talks to humans, delegates tasks
- **PLANNER** (Claude Opus 4): Designs and plans features  
- **WORKER** (Claude Sonnet 4): Writes code and runs tests

**Agent Communication**:
```bash
# From any agent window:
tmux send-keys -t MANAGER "WORKER: Task complete" C-m
tmux send-keys -t PLANNER "MANAGER: Plan needed" C-m
```

**Project Structure**:
```
my-project/
├── .cursor/rules/amos/          # Agent instructions
├── scripts/start_workflow.sh    # Start agents
└── src/                         # Your code
```

## 🎯 **Next Steps**

1. **Customize Project**: Edit `.cursor/rules/amos/project-data/project_brief.mdc`
2. **Add Task Management**: Install `task-master-ai` for structured tasks
3. **Configure AI**: Load agent instructions in each window
4. **Start Building**: Begin delegating tasks to your agents

## 🔧 **Common Commands**

```bash
# Check agents
tmux list-sessions

# Restart agents
tmux kill-session -t AI_Project_Workflow
./scripts/start_workflow.sh

# System check
amos check
```

## 💡 **Tips**

- **Always detach** with `Ctrl+b + d` (don't close terminals)
- **Monitor before commanding** - attach and watch first
- **Start simple** - basic echo agents work great for testing
- **Scale up** - add AI integration once comfortable

---

**Need help?** Check `.cursor/rules/amos/tool-integrations/terminal_management.md` for advanced usage.

**Ready to build?** Your multi-agent development environment is running! 🎉