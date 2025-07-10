# Command: /amos-start

Start a simple AMOS sub-agent session using Claude's native capabilities.

## Description
Begins a multi-agent workflow using Claude sub-agents with simple workspace isolation. No complex scripts or coordination systems required.

## Parameters
- `TASK_DESCRIPTION` (required): Description of the work to be done

## Steps

1. **Create Simple Workspace**
```bash
# Create isolated workspace using git worktree
git worktree add ../amos-work feature/$(echo "$TASK_DESCRIPTION" | tr ' ' '-' | tr '[:upper:]' '[:lower:]')
cd ../amos-work
```

2. **Read Project Memory**
```bash
# Load project context
cat .cursor/rules/amos/project-data/amos_config.mdc
cat .cursor/rules/amos/project-data/agent_state.mdc
```

3. **Initialize Session State**
Update `.cursor/rules/amos/project-data/agent_state.mdc`:
```markdown
## Current Session
- Phase: ASSESS
- Task: $TASK_DESCRIPTION
- Started: $(date)
- Workspace: ../amos-work
- Sub-agents needed: TBD

## Session Log
- $(date): Session started with task: $TASK_DESCRIPTION
```

4. **Begin ASSESS Phase**
   - Read `amos_config.mdc` for project context and standards
   - Understand the task requirements and scope
   - Determine if PLANNER and/or WORKER sub-agents needed
   - Update session state with assessment

5. **Ready for Sub-Agent Delegation**
   - Use SUBAGENT_MANAGER.mdc patterns for delegation
   - Follow WORKFLOW_PHASES.mdc for structured coordination
   - Keep all work in isolated ../amos-work directory

## Success Criteria
- [ ] Workspace created and isolated
- [ ] Project memory loaded
- [ ] Session state initialized
- [ ] ASSESS phase begun
- [ ] Ready for sub-agent delegation

## Example Usage
```
/amos-start "Implement user authentication with OAuth"
```

## Next Steps
After starting, use the Sub-Agent Manager patterns:
- Create PLANNER sub-agent for technical planning
- Create WORKER sub-agents for specific implementation tasks
- Follow simple file-based coordination to prevent conflicts

---
*Simple sub-agent workflow using Claude's native capabilities*