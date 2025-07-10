# Changelog

All notable changes to AMOS Generator will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.5.0] - 2025-07-10

### 🚀 Major Architecture Improvements

#### Added
- **Session-based tmux architecture**: Each agent now runs in its own independent session (`MANAGER`, `PLANNER`, `WORKER`)
- **Permission bypassing**: Agents start with autonomous command execution enabled
  - MANAGER: `--yolo` flag for Gemini
  - PLANNER/WORKER: `--dangerously-skip-permissions` flag for Claude
- **Simplified communication protocol**: Direct session addressing without complex window navigation
- **Auto-initialization**: Agents automatically load their instructions and start ready for autonomous operation

#### Changed
- **Communication format**: From `AI_Project_Workflow:MANAGER` to simple `MANAGER` session addressing
- **Startup script**: Complete rewrite to use separate sessions instead of window-based approach
- **Documentation**: Updated README.md and QUICKSTART.md to reflect session-based workflow
- **Agent instruction templates**: Enhanced with permission bypassing context

#### Improved
- **Agent monitoring**: Individual session attachment with `tmux attach-session -t MANAGER/PLANNER/WORKER`
- **Development workflow**: Autonomous inter-agent communication without manual permission prompts
- **System reliability**: Better agent isolation and independent session management
- **Communication examples**: Updated all documentation with new session-based examples

### 🛠️ Technical Details

#### Before (v1.4.0):
```bash
# Complex window-based system
tmux attach-session -t AI_Project_Workflow
tmux send-keys -t "AI_Project_Workflow:MANAGER" "message" C-m
# Navigate with Ctrl+b + 0/1/2
```

#### After (v1.5.0):
```bash
# Simple session-based system
tmux attach-session -t MANAGER
tmux send-keys -t MANAGER "WORKER→MANAGER: ✅ Task complete" C-m
# Each agent in independent session
```

### 📚 Updated Documentation
- **README.md**: Complete rewrite of Multi-Agent Workflow and Communication Protocol sections
- **QUICKSTART.md**: Updated monitoring instructions and architecture explanations
- **tmux_protocols.mdc**: Simplified communication examples and session-based addressing
- **package.json**: Version bump and description update

### 🔧 Files Modified
- `lib/templates/scripts/start_workflow.sh` - Complete rewrite for session architecture
- `lib/templates/communication/tmux_protocols.mdc` - Updated communication examples
- `README.md` - Major documentation updates
- `QUICKSTART.md` - Updated monitoring and communication instructions
- `package.json` - Version and description updates

### ⚡ Performance & Reliability
- **Faster agent startup**: Permission bypassing eliminates manual approval delays
- **Better isolation**: Independent sessions prevent cross-agent interference
- **Simplified debugging**: Each agent can be monitored independently
- **Autonomous operation**: Agents can communicate and execute tasks without human intervention

---

## [1.4.0] and earlier

Previous versions used window-based tmux architecture with manual permission management. See git history for detailed changes.