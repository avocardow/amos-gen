# Terminal Management

## Basic Commands

### View Sessions
```bash
tmux list-sessions              # See all sessions
tmux attach-session -t AI_Project_Workflow  # Attach to AMOS
```

### Navigate Windows  
```bash
Ctrl+b + 0    # MANAGER window
Ctrl+b + 1    # PLANNER window  
Ctrl+b + 2    # WORKER window
Ctrl+b + d    # Detach (keeps running)
```

### Monitor Agents
```bash
# Attach to specific agent
tmux attach-session -t AI_Project_Workflow:MANAGER
tmux attach-session -t AI_Project_Workflow:PLANNER
tmux attach-session -t AI_Project_Workflow:WORKER
```

### Send Commands
```bash
tmux send-keys -t WORKER "git status" C-m
tmux send-keys -t PLANNER "echo 'hello'" C-m
```

---

*Keep it simple. Most work happens automatically via agent communication.*