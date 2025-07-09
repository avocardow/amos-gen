# AMOS Post-Generation Instructions

## 🚀 **What You Just Created**

You've successfully generated an AMOS (Agentic Multi-Orchestration System) project with:

```
your-project/
├── .cursor/rules/amos/           # AI Agent instructions and project data
│   ├── agent-instructions/       # Manager, Planner, Worker roles
│   ├── project-data/            # Project config, brief, workflow state
│   └── tool-integrations/       # Task Master, GitHub, MCP integrations
├── scripts/start_workflow.sh    # Tmux session launcher
└── src/                         # Your project source code
```

## 📋 **Essential Next Steps**

### **Step 1: Initialize Task Master**
```bash
# Install Task Master globally (if not already installed)
npm install -g task-master-ai

# Initialize in your project
task-master init -y

# Set up AI models (interactive)
task-master models --setup
```

**Required**: Add API keys to `.env` file:
```bash
# At minimum, add one of these:
ANTHROPIC_API_KEY=your_claude_key_here
PERPLEXITY_API_KEY=your_perplexity_key_here  # For research features
OPENAI_API_KEY=your_openai_key_here
```

### **Step 2: Configure Your Project**

1. **Edit Project Brief**:
   ```bash
   # Open and customize your project overview
   cursor .cursor/rules/amos/project-data/project_brief.mdc
   ```

2. **Update Project Configuration**:
   ```bash
   # Configure tech stack, build commands, testing
   cursor .cursor/rules/amos/project-data/project_config.mdc
   ```

3. **Set Initial Workflow State**:
   ```bash
   # Update current project phase and priorities
   cursor .cursor/rules/amos/project-data/workflow_state.mdc
   ```

### **Step 3: Create Your Project Requirements**

1. **Create PRD (Product Requirements Document)**:
   ```bash
   # Create PRD file
   mkdir -p .taskmaster/docs
   touch .taskmaster/docs/prd.txt
   
   # Edit with your project requirements
   cursor .taskmaster/docs/prd.txt
   ```

2. **Generate Tasks from PRD**:
   ```bash
   # Parse PRD into structured tasks
   task-master parse-prd .taskmaster/docs/prd.txt
   
   # Analyze task complexity
   task-master analyze-complexity --research
   
   # Expand complex tasks into subtasks
   task-master expand --all --research
   ```

### **Step 4: Launch Multi-Agent Environment**

1. **Start Tmux Session**:
   ```bash
   # Launch three-agent environment
   ./scripts/start_workflow.sh
   ```

2. **Load Agent Instructions**:
   In each tmux pane, load the respective agent instructions:
   
   - **MANAGER (Blue pane)**: `cursor .cursor/rules/amos/agent-instructions/MANAGER.mdc`
   - **PLANNER (Yellow pane)**: `cursor .cursor/rules/amos/agent-instructions/PLANNER.mdc`
   - **WORKER (Green pane)**: `cursor .cursor/rules/amos/agent-instructions/WORKER.mdc`

## 🎯 **Development Workflow**

### **Basic Task Cycle**

1. **Manager Gets Next Task**:
   ```bash
   task-master next
   ```

2. **Delegate to Planner**:
   ```bash
   tmux send-keys -t PLANNER "MANAGER: Plan implementation for: [task-description]" C-m
   ```

3. **Planner Responds**:
   ```bash
   tmux send-keys -t MANAGER "PLANNER: Implementation plan ready - [summary]" C-m
   ```

4. **Delegate to Worker**:
   ```bash
   tmux send-keys -t WORKER "MANAGER: Implement: [specific-task]" C-m
   ```

5. **Worker Completes**:
   ```bash
   tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: [task-id]" C-m
   ```

6. **Manager Marks Complete**:
   ```bash
   task-master set-status --id=<task-id> --status=done
   ```

### **Communication Protocol**

**Standard Message Format**:
```
[SOURCE_AGENT]: [MESSAGE_TYPE]: [CONTENT]
```

**Message Types**:
- `TASK_ASSIGN`: Assign work to agent
- `TASK_COMPLETE`: Report completion
- `TASK_FAILED`: Report failure with reason
- `STATUS_UPDATE`: Progress update
- `CONTEXT_CHANGE`: Requirements changed
- `HELP_REQUEST`: Need assistance

### **Task Master Commands**

```bash
# Core commands
task-master list                    # View all tasks
task-master next                    # Get next task
task-master show <id>              # View task details
task-master set-status --id=<id> --status=done  # Mark complete

# Task management
task-master add-task --prompt="description"     # Add new task
task-master expand --id=<id> --research         # Break into subtasks
task-master update --from=<id> --prompt="info"  # Update multiple tasks

# Analysis
task-master analyze-complexity --research       # Analyze task complexity
task-master complexity-report                   # View complexity report
```

## 🔧 **Testing Your Setup**

### **Test 1: Basic Communication**
```bash
# From MANAGER pane
tmux send-keys -t PLANNER "MANAGER: Test message - please acknowledge" C-m

# PLANNER should respond
tmux send-keys -t MANAGER "PLANNER: Message received and acknowledged" C-m
```

### **Test 2: Task Master Integration**
```bash
# Add test task
task-master add-task --prompt="Create a hello world component"

# Get next task
task-master next

# Complete task
task-master set-status --id=1 --status=done
```

## 📚 **Key Features**

### **Agent Roles**
- **MANAGER**: Orchestrates workflow, communicates with humans, manages git operations
- **PLANNER**: Handles architecture, strategic planning, breaks down requirements
- **WORKER**: Implements code, runs tests, handles technical execution

### **Tool Integrations**
- **Task Master AI**: Structured task management with AI assistance
- **GitHub CLI**: Repository management and PR workflows
- **Cursor Rules**: IDE-specific AI behavior configuration
- **MCP Servers**: Enhanced AI capabilities through Model Context Protocol

### **Living Documentation**
- **project_config.mdc**: Long-term project memory and standards
- **project_brief.mdc**: High-level project overview and goals
- **workflow_state.mdc**: Current progress and active tasks

## 🚨 **Troubleshooting**

### **Task Master Issues**
```bash
# Check configuration
task-master models

# Reconfigure models
task-master models --setup

# Check for API key issues
cat .env
```

### **Tmux Session Issues**
```bash
# List sessions
tmux list-sessions

# Kill and restart
tmux kill-session -t AI_Project_Workflow
./scripts/start_workflow.sh
```

### **Communication Problems**
```bash
# Check pane names
tmux list-panes -t AI_Project_Workflow

# Manually switch panes
tmux select-pane -t MANAGER
```

## 📖 **Advanced Usage**

### **Multiple Projects**
```bash
# Create different projects
amos gen project-a
amos gen project-b

# Each gets independent task management
cd project-a && task-master init -y
cd project-b && task-master init -y
```

### **Custom Task Workflows**
```bash
# Use research for complex tasks
task-master expand --id=<id> --research --prompt="Include security considerations"

# Update multiple tasks based on new requirements
task-master update --from=5 --prompt="Updated API endpoints"
```

### **Integration with Git**
```bash
# Manager handles git operations
git add .
git commit -m "feat: implement user authentication (task-1.2)"
git push origin main
```

## 🎉 **You're Ready!**

Your AMOS multi-agent development environment is now set up and ready for use. The system will help you:

1. **Manage Tasks**: Structured task breakdown with AI assistance
2. **Coordinate Agents**: Clear communication protocols between specialized AI agents
3. **Maintain Documentation**: Living documentation that evolves with your project
4. **Integrate Tools**: Seamless integration with development tools and workflows

**Happy coding with your AI agent team!** 🤖✨

---

*For more detailed workflows, see `AMOS-WORKFLOW-GUIDE.md`*