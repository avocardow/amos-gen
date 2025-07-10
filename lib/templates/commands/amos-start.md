# Command: /amos-start

Start a new AMOS multi-agent development session with workspace isolation.

## Description
Initializes the AMOS coordination system and creates isolated workspaces for multi-agent development. This prevents conflicts and enables safe parallel work.

## Parameters
- `TASK_DESCRIPTION` (required): Description of the work to be done
- `COMPLEXITY` (optional): Simple | Moderate | Complex (default: Moderate)

## Steps

1. **Initialize Coordination System**
```bash
./scripts/workspace_isolation.sh init
```

2. **Create Manager Agent**
```bash
MANAGER_ID=$(./scripts/workspace_isolation.sh create MANAGER)
echo "Manager agent created: $MANAGER_ID"
```

3. **Setup Memory Architecture**
```bash
# Read long-term project memory
cat .cursor/rules/amos/project-data/amos_config.mdc

# Initialize session state
cp .cursor/rules/amos/project-data/agent_state.mdc .amos/coordination/session_state.mdc
```

4. **Start Manager Session**
```bash
tmux attach-session -t AMOS_MANAGER
```

5. **Manager Initial Assessment**
   - Read `amos_config.mdc` for project context
   - Review `agent_state.mdc` for session history
   - Update session state with new task assessment
   - Determine if PLANNER and/or WORKER agents needed

6. **Agent Creation (as needed)**
```bash
# If planning required
PLANNER_ID=$(./scripts/workspace_isolation.sh create PLANNER $TASK_ID)

# If implementation required  
WORKER_ID=$(./scripts/workspace_isolation.sh create WORKER $TASK_ID)
```

7. **Begin Workflow Phases**
   - **ASSESS**: Manager understands requirements
   - **PLAN**: Planner creates technical strategy
   - **DELEGATE**: Manager coordinates task distribution
   - **VERIFY**: All agents validate completion

## Success Criteria
- [ ] Coordination system initialized
- [ ] Manager agent active and oriented
- [ ] Session state updated with task description
- [ ] Workflow phase commenced (ASSESS)
- [ ] Additional agents created as needed

## Example Usage
```
/amos-start "Implement user authentication with OAuth" Complex
```

## Related Commands
- `/amos-status` - Check current agent status
- `/amos-cleanup` - Clean up completed session
- `/amos-claim` - Claim file for exclusive access

---
*This command initializes the full AMOS multi-agent workflow with isolation*