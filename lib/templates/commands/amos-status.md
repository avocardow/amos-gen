# Command: /amos-status

Check the status of current AMOS sub-agent session.

## Description
Shows current session state, active workspace, and sub-agent progress using simple file-based tracking.

## Steps

1. **Check for Active Workspace**
```bash
# Check if AMOS workspace exists
if [[ -d "../amos-work" ]]; then
    echo "✅ AMOS workspace active: ../amos-work"
    echo "📂 Branch: $(cd ../amos-work && git branch --show-current)"
else
    echo "❌ No active AMOS workspace"
    echo "💡 Start session with: /amos-start \"your task description\""
fi
```

2. **Display Session State**
```bash
echo "🔄 Current Session:"
grep -A 10 "## Current Session" .cursor/rules/amos/project-data/agent_state.mdc 2>/dev/null || echo "No session state found"
```

3. **Show Active File Assignments**
```bash
echo "📋 Active Work:"
grep -A 5 "## Active File Assignments" .cursor/rules/amos/project-data/agent_state.mdc 2>/dev/null || echo "No active file assignments"
```

4. **Display Recent Sub-Agent Activity**
```bash
echo "🤖 Sub-Agent History:"
grep -A 5 "## Sub-Agent History" .cursor/rules/amos/project-data/agent_state.mdc 2>/dev/null || echo "No sub-agent activity logged"
```

5. **Check Current Workflow Phase**
```bash
echo "📍 Workflow Phase:"
grep "Phase:" .cursor/rules/amos/project-data/agent_state.mdc 2>/dev/null || echo "Phase not set"
```

6. **Show Memory Usage**
```bash
echo "🧠 Memory Status:"
echo "  Long-term config: $(wc -c < .cursor/rules/amos/project-data/amos_config.mdc 2>/dev/null || echo 0) bytes"
echo "  Session state: $(wc -c < .cursor/rules/amos/project-data/agent_state.mdc 2>/dev/null || echo 0) bytes"
echo "  Estimated tokens: ~$(expr $(wc -c < .cursor/rules/amos/project-data/agent_state.mdc 2>/dev/null || echo 0) / 4)"
```

## Example Output

```
✅ AMOS workspace active: ../amos-work
📂 Branch: feature/user-authentication

🔄 Current Session:
- Phase: DELEGATE
- Task: Implement user authentication with OAuth
- Started: 2024-07-05T10:30:00Z
- Workspace: ../amos-work
- Sub-agents needed: PLANNER, WORKER

📋 Active Work:
- src/auth/login.ts: WORKER sub-agent (OAuth implementation)
- src/auth/types.ts: WORKER sub-agent (type definitions)

🤖 Sub-Agent History:
- PLANNER_001: OAuth architecture planning (completed)
- WORKER_001: login.ts implementation (in progress)

📍 Workflow Phase: DELEGATE

🧠 Memory Status:
  Long-term config: 1,200 bytes
  Session state: 800 bytes
  Estimated tokens: ~200
```

## Success Criteria
- [ ] Workspace status displayed
- [ ] Current session information shown
- [ ] Active file assignments listed
- [ ] Sub-agent history visible
- [ ] Memory usage reported

## Troubleshooting

### No Active Session
```bash
echo "💡 Start a new session:"
echo "  /amos-start \"your task description\""
```

### Missing State Information
```bash
echo "🔧 Initialize session state:"
echo "  Update .cursor/rules/amos/project-data/agent_state.mdc with current session info"
```

### Workspace Issues
```bash
echo "📂 Check workspace:"
echo "  ls -la ../amos-work"
echo "🔄 Reset if needed:"
echo "  git worktree remove ../amos-work && /amos-start \"task\""
```

## Related Commands
- `/amos-start` - Start new sub-agent session

---
*Simple status check for template-driven sub-agent coordination*