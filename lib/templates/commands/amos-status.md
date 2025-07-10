# Command: /amos-status

Display current status of AMOS multi-agent coordination system.

## Description
Shows active agents, file locks, work queue, and session progress. Essential for monitoring multi-agent workflows and identifying bottlenecks.

## Parameters
- `DETAIL_LEVEL` (optional): summary | full (default: summary)

## Steps

1. **Check Coordination System**
```bash
# Verify coordination system is active
if [[ ! -d ".amos/coordination" ]]; then
    echo "❌ AMOS coordination system not initialized"
    echo "Run: ./scripts/workspace_isolation.sh init"
    exit 1
fi
```

2. **Display Active Agents**
```bash
echo "🤖 Active AMOS Agents:"
./scripts/workspace_isolation.sh list
```

3. **Show Current Workflow Phase**
```bash
echo "🔄 Workflow Status:"
if [[ -f ".amos/coordination/session_state.mdc" ]]; then
    grep -E "Phase:|Status:" .amos/coordination/session_state.mdc || echo "No active session"
else
    echo "No session state found"
fi
```

4. **Display Memory Status**
```bash
echo "🧠 Memory Architecture:"
echo "  Long-term: $(wc -c < .cursor/rules/amos/project-data/amos_config.mdc) bytes"
echo "  Session: $(wc -c < .cursor/rules/amos/project-data/agent_state.mdc) bytes"
```

5. **Check Git Integration**
```bash
echo "📊 Git Status:"
echo "  Main branch: $(git branch --show-current)"
echo "  Agent branches: $(git branch | grep -c "amos/" || echo 0)"
echo "  Worktrees: $(git worktree list | grep -c "amos-agents" || echo 0)"
```

6. **Show Recent Activity (if detail=full)**
```bash
if [[ "${1:-summary}" == "full" ]]; then
    echo "📋 Recent Coordination Activity:"
    if [[ -f ".amos/coordination/activity.log" ]]; then
        tail -10 .amos/coordination/activity.log
    else
        echo "  No activity log found"
    fi
fi
```

7. **Performance Metrics**
```bash
echo "⚡ Performance:"
echo "  Token usage: ~$(expr $(wc -c < .cursor/rules/amos/project-data/agent_state.mdc) / 4) tokens"
echo "  Active locks: $(jq 'length' .amos/coordination/file_locks.json 2>/dev/null || echo 0)"
echo "  Session uptime: $(stat -f %Sm .amos/coordination/active_agents.json 2>/dev/null || echo "N/A")"
```

## Output Format

### Summary View
```
🤖 Active AMOS Agents:
  MANAGER_1720123456: MANAGER (active) - AMOS_MANAGER
  WORKER_1720123457: WORKER (active) - AMOS_WORKER

🔒 File Locks:
  src/auth/login.ts: WORKER_1720123457 - Implementing OAuth flow

🔄 Workflow Status:
  Phase: DELEGATE
  Active Agent: MANAGER
  Last Update: 2024-07-05T10:30:00Z

⚡ Performance:
  Token usage: ~200 tokens
  Active locks: 1
  Session uptime: Jul  5 10:30
```

### Full View
Includes all summary information plus:
- Recent coordination activity log
- Detailed agent workspace information
- Blueprint history summary
- Memory usage breakdown

## Success Criteria
- [ ] Coordination system status displayed
- [ ] Active agents and their roles shown
- [ ] File locks and conflicts identified
- [ ] Current workflow phase indicated
- [ ] Performance metrics reported

## Troubleshooting

### No Active Agents
```bash
echo "💡 To start agents:"
echo "  ./scripts/workspace_isolation.sh create MANAGER"
```

### Stuck Agents
```bash
echo "🔧 To cleanup stuck agents:"
echo "  ./scripts/workspace_isolation.sh cleanup <agent_id>"
```

### Missing Coordination
```bash
echo "🚀 To initialize system:"
echo "  ./scripts/workspace_isolation.sh init"
```

## Related Commands
- `/amos-start` - Start new multi-agent session
- `/amos-cleanup` - Clean up completed session  
- `/amos-claim` - Claim file for exclusive access

---
*Essential for monitoring multi-agent coordination health*