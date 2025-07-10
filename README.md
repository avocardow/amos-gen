# AMOS Generator

**AMOS (Agentic Multi-Orchestration System) Generator** is a command-line tool that scaffolds a complete multi-agent AI development workflow in seconds. Transform project setup from manual configuration to instant deployment with a single command.

## 🚀 Quick Start

```bash
# Install globally
npm install -g amos-gen

# Generate new project (simple mode)
amos gen my-project --simple

# Launch multi-agent workflow
cd my-project
./scripts/start_workflow.sh
```

**Simple Mode**: Gets you started faster with minimal templates and a focused quick-start guide.  
**Full Mode**: Complete templates with comprehensive documentation and integrations.

## 📋 What You Get

AMOS Generator creates a complete project structure with:

### 🤖 **Agent Instructions**
- **MANAGER.md**: Project orchestrator with tmux communication protocol
- **PLANNER.md**: Strategic planning agent with architectural focus
- **WORKER.md**: Implementation agent with task execution capabilities

### 🛠️ **Tool Integrations**
- **Task Master AI**: Structured task management and workflow tracking
- **GitHub CLI**: Repository management and PR/issue workflows
- **Cursor Rules**: IDE-specific agent behavior configuration
- **MCP Servers**: Model Context Protocol for enhanced capabilities

### 📚 **Living Documentation**
- **Codebase Map**: Maintained project structure and dependency tracking
- **Roadmap**: Milestone tracking and project phase management
- **Tech Stack**: Architectural decisions and technology documentation

### 💬 **Communication Protocols**
- **Tmux Protocols**: Standardized inter-agent messaging patterns
- **Documentation Maintenance**: Automated documentation update workflows

### 🎯 **Project Data**
- **Project Brief**: High-level goals and requirements
- **Project Config**: Environment setup and build configuration
- **Workflow State**: Current phase and progress tracking

## 🏗️ Generated Structure

```
my-project/
├── .cursor/
│   └── rules/
│       └── amos/
│           ├── agent-instructions/
│           │   ├── MANAGER.mdc
│           │   ├── PLANNER.mdc
│           │   ├── WORKER.mdc
│           │   ├── BOOTSTRAP.mdc
│           │   └── WORKFLOW_PHASES.mdc
│           ├── project-data/
│           │   ├── amos_config.mdc
│           │   ├── agent_state.mdc
│           │   ├── coding_conventions.mdc
│           │   ├── testing_patterns.mdc
│           │   └── codebase_map.mdc
│           ├── communication/
│           │   └── tmux_protocols.mdc
│           └── tool-integrations/
│               ├── task_master.md
│               ├── github_integration.md
│               └── mcp_servers.md
├── scripts/
│   └── start_workflow.sh
└── src/
    └── (your project code)
```

## 🎭 Multi-Agent Workflow

The generated tmux script creates three independent AI agent sessions:

### 🔵 **MANAGER** (Blue Session - Gemini 2.5 Pro)
- Communicates with human user
- Delegates tasks to Planner and Worker
- Manages overall project state
- Executes shell commands and git operations
- **Permission bypassing**: `--yolo` flag enabled

### 🟡 **PLANNER** (Yellow Session - Claude Opus 4)
- Strategic planning and architecture
- Requirements analysis and task breakdown
- Documentation and roadmap maintenance
- No direct code writing
- **Permission bypassing**: `--dangerously-skip-permissions` flag enabled

### 🟢 **WORKER** (Green Session - Claude Sonnet 4)
- Code implementation and execution
- Task completion and status reporting
- Technical implementation details
- Direct file system operations
- **Permission bypassing**: `--dangerously-skip-permissions` flag enabled

## 📡 Communication Protocol

Agents communicate via simplified tmux messaging (each agent runs in its own session):

```bash
# Manager to Planner
tmux send-keys -t PLANNER "MANAGER→PLANNER: Plan user authentication system" C-m

# Manager to Worker
tmux send-keys -t WORKER "MANAGER→WORKER: Implement login component" C-m

# Worker to Manager
tmux send-keys -t MANAGER "WORKER→MANAGER: ✅ login-component complete with tests" C-m

# Planner to Manager
tmux send-keys -t MANAGER "PLANNER→MANAGER: 📋 Architecture planned in agent_state.mdc" C-m
```

**Key Features:**
- **Simple addressing**: Direct session names (`MANAGER`, `PLANNER`, `WORKER`)
- **No permission prompts**: Agents execute commands autonomously
- **Status icons**: ✅ ⚠️ 🔄 for clear communication

## 🔧 CLI Reference

### `amos gen [project-name]`

Generate a new AMOS project structure.

**Arguments:**
- `project-name` (optional): Name of the project directory to create (defaults to `amos-project`)

**Options:**
- `--simple`: Generate with simplified templates and documentation
- `-h, --help`: Display help information
- `-V, --version`: Display version number

**Examples:**
```bash
amos gen                    # Creates 'amos-project' directory (full mode)
amos gen my-app --simple   # Creates 'my-app' directory (simple mode)
amos gen ~/projects/new-ai # Creates project in specific path
```

### `amos check`

Check system requirements for AMOS (tmux, git, Node.js).

**Simple vs Full Mode:**
- **Simple**: 6 files, concise agent instructions, quick-start guide
- **Full**: 17 files, comprehensive documentation, all integrations

## 🚦 Getting Started

1. **Install AMOS Generator**
   ```bash
   npm install -g amos-gen
   ```

2. **Generate Project**
   ```bash
   amos gen my-ai-project
   cd my-ai-project
   ```

3. **Launch Workflow**
   ```bash
   ./scripts/start_workflow.sh
   ```

4. **Initialize Task Master**
   ```bash
   task-master init -y
   task-master models --setup
   ```

5. **Monitor Agent Sessions**
   ```bash
   # Attach to individual agents
   tmux attach-session -t MANAGER    # Blue session - Gemini 2.5 Pro
   tmux attach-session -t PLANNER    # Yellow session - Claude Opus 4
   tmux attach-session -t WORKER     # Green session - Claude Sonnet 4
   
   # Detach from any session: Ctrl+b + d
   ```

6. **Agent Auto-Initialization**
   - Agents automatically load their instructions on startup
   - **MANAGER**: Loads `MANAGER.mdc` and starts in YOLO mode
   - **PLANNER**: Loads `PLANNER.mdc` with permission bypass
   - **WORKER**: Loads `WORKER.mdc` with permission bypass

7. **Start Collaborating**
   - Edit `project-data/project_brief.mdc` with your project goals
   - Create PRD and generate tasks with Task Master
   - Begin delegating tasks through the Manager agent
   - Use the tmux communication protocol for inter-agent coordination

## 💡 Best Practices

### 🎯 **Project Initialization**
- Always start by editing `project_brief.md` with clear goals
- Review and customize `project_config.md` for your environment
- Set up any required API keys and dependencies

### 📋 **Task Management**
- Use Task Master AI integration for structured task tracking
- Break down complex features into smaller, manageable tasks
- Keep `workflow_state.md` updated with current progress

### 🔄 **Documentation Maintenance**
- Update `codebase_map.md` after structural changes
- Keep `roadmap.md` milestones current
- Document architectural decisions in `tech_stack.md`

### 🤝 **Agent Coordination**
- Use standardized message formats for clear communication
- Delegate planning tasks to the Planner agent
- Assign implementation work to the Worker agent
- Keep the Manager focused on orchestration

## 🔧 Integration Examples

### Task Master AI Integration
```bash
# Install Task Master
npm install -g task-master-ai

# Initialize in project
task-master init -y
task-master models --setup

# Create PRD and generate tasks
task-master parse-prd .taskmaster/docs/prd.txt
task-master analyze-complexity --research
task-master expand --all --research

# Manager delegates via Task Master
task-master next
tmux send-keys -t PLANNER "MANAGER→PLANNER: Plan task $(task-master next --format=id)" C-m
tmux send-keys -t WORKER "MANAGER→WORKER: Implement $(task-master show 1 --format=title)" C-m
```

### GitHub Integration
```bash
# Setup GitHub CLI
gh auth login

# Manager creates PR via Worker
tmux send-keys -t WORKER "MANAGER→WORKER: Create PR for completed authentication feature" C-m
```

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/amos-team/amos-gen/issues)
- **Documentation**: See generated template files for detailed integration guides
- **Community**: Join our discussions for tips and best practices

## 📄 License

MIT License - see LICENSE file for details.

## 🎯 Philosophy

AMOS Generator embodies the principle of **"Instant Orchestration"** - transforming the complex setup of multi-agent AI workflows into a single command execution. By providing standardized templates, communication protocols, and integration patterns, it enables developers to focus on their project goals rather than infrastructure setup.

The system places humans in the "Trusted Executor" role, maintaining full control while benefiting from massive automation and AI assistance across planning, implementation, and maintenance phases.

## 📚 **Additional Resources**

- **📖 [POST-GENERATION-INSTRUCTIONS.md](POST-GENERATION-INSTRUCTIONS.md)**: Essential setup steps after generation
- **📚 [AMOS-WORKFLOW-GUIDE.md](AMOS-WORKFLOW-GUIDE.md)**: Complete workflow documentation
- **🔧 [test-communication.md](test-demo-project2/test-communication.md)**: Communication testing guide

---

*Ready to revolutionize your AI development workflow? Get started with `amos gen` today!*