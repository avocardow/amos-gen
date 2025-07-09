# AMOS Generator

**AMOS (Agentic Multi-Orchestration System) Generator** is a command-line tool that scaffolds a complete multi-agent AI development workflow in seconds. Transform project setup from manual configuration to instant deployment with a single command.

## 🚀 Quick Start

```bash
# Install globally
npm install -g amos-gen

# Generate new project
amos gen my-project

# Launch multi-agent workflow
cd my-project
./scripts/start_workflow.sh
```

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
│           │   ├── MANAGER.md
│           │   ├── PLANNER.md
│           │   └── WORKER.md
│           ├── tool-integrations/
│           │   ├── task_master.md
│           │   ├── github_integration.md
│           │   ├── cursor_rules.md
│           │   └── mcp_servers.md
│           ├── living-docs/
│           │   ├── codebase_map.md
│           │   ├── roadmap.md
│           │   └── tech_stack.md
│           ├── communication/
│           │   ├── tmux_protocols.md
│           │   └── doc_maintenance.md
│           └── project_data/
│               ├── project_brief.md
│               ├── project_config.md
│               └── workflow_state.md
├── scripts/
│   └── start_workflow.sh
└── src/
    └── (your project code)
```

## 🎭 Multi-Agent Workflow

The generated tmux script creates a three-pane environment:

### 🔵 **MANAGER** (Blue Pane)
- Communicates with human user
- Delegates tasks to Planner and Worker
- Manages overall project state
- Executes shell commands and git operations

### 🟡 **PLANNER** (Yellow Pane)
- Strategic planning and architecture
- Requirements analysis and task breakdown
- Documentation and roadmap maintenance
- No direct code writing

### 🟢 **WORKER** (Green Pane)
- Code implementation and execution
- Task completion and status reporting
- Technical implementation details
- Direct file system operations

## 📡 Communication Protocol

Agents communicate via tmux messaging:

```bash
# Manager to Planner
tmux send-keys -t PLANNER "MANAGER: Plan user authentication system" C-m

# Manager to Worker
tmux send-keys -t WORKER "MANAGER: Implement login component" C-m

# Worker to Manager
tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: login-component" C-m

# Planner to Manager
tmux send-keys -t MANAGER "PLANNER: STATUS_UPDATE: Architecture planned" C-m
```

## 🔧 CLI Reference

### `amos gen [project-name]`

Generate a new AMOS project structure.

**Arguments:**
- `project-name` (optional): Name of the project directory to create (defaults to `amos-project`)

**Options:**
- `-h, --help`: Display help information
- `-V, --version`: Display version number

**Examples:**
```bash
amos gen                    # Creates 'amos-project' directory
amos gen my-app            # Creates 'my-app' directory
amos gen ~/projects/new-ai # Creates project in specific path
```

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

4. **Load Agent Instructions**
   - In **MANAGER** pane: Load `.cursor/rules/amos/agent-instructions/MANAGER.md`
   - In **PLANNER** pane: Load `.cursor/rules/amos/agent-instructions/PLANNER.md`
   - In **WORKER** pane: Load `.cursor/rules/amos/agent-instructions/WORKER.md`

5. **Start Collaborating**
   - Edit `project_data/project_brief.md` with your project goals
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
task-master init
task-master models --setup

# Manager delegates via Task Master
task-master add-task --prompt="Implement user authentication"
tmux send-keys -t WORKER "MANAGER: Work on $(task-master next --format=id)" C-m
```

### GitHub Integration
```bash
# Setup GitHub CLI
gh auth login

# Manager creates PR via Worker
tmux send-keys -t WORKER "MANAGER: Create PR for completed authentication feature" C-m
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

---

*Ready to revolutionize your AI development workflow? Get started with `amos gen` today!*