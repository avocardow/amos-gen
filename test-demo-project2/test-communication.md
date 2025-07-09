# AMOS Communication Test Script

## Test 1: Basic Inter-Agent Communication

### Step 1: Launch tmux session
```bash
./scripts/start_workflow.sh
```

### Step 2: Test Manager → Planner Communication
In MANAGER pane:
```bash
tmux send-keys -t PLANNER "MANAGER: Test message 1 - please acknowledge" C-m
```

Expected PLANNER response:
```bash
tmux send-keys -t MANAGER "PLANNER: Message received and acknowledged" C-m
```

### Step 3: Test Manager → Worker Communication
In MANAGER pane:
```bash
tmux send-keys -t WORKER "MANAGER: Test message 2 - please acknowledge" C-m
```

Expected WORKER response:
```bash
tmux send-keys -t MANAGER "WORKER: Message received and acknowledged" C-m
```

## Test 2: Task Delegation Workflow

### Step 1: Manager assigns planning task
```bash
tmux send-keys -t PLANNER "MANAGER: Plan a simple React component for user authentication" C-m
```

### Step 2: Planner responds with plan
```bash
tmux send-keys -t MANAGER "PLANNER: Authentication component plan complete - includes login form, validation, and state management" C-m
```

### Step 3: Manager assigns implementation task
```bash
tmux send-keys -t WORKER "MANAGER: Implement React login component with form validation" C-m
```

### Step 4: Worker completes task
```bash
tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: login-component" C-m
```

## Test 3: Task Master Integration

### Step 1: Add test task
```bash
task-master add-task --prompt="Create a sample user registration form"
```

### Step 2: Get next task
```bash
task-master next
```

### Step 3: Manager delegates task
```bash
tmux send-keys -t PLANNER "MANAGER: TASK_ASSIGN: Design user registration form architecture" C-m
```

### Step 4: Complete task cycle
```bash
# After implementation
task-master set-status --id=1 --status=done
```

## Test 4: Error Handling

### Step 1: Worker reports failure
```bash
tmux send-keys -t MANAGER "WORKER: TASK_FAILED: registration-form - Missing React dependency" C-m
```

### Step 2: Manager provides resolution
```bash
tmux send-keys -t WORKER "MANAGER: Install React dependency: npm install react react-dom" C-m
```

### Step 3: Worker retries
```bash
tmux send-keys -t MANAGER "WORKER: TASK_COMPLETE: registration-form" C-m
```

## Test Results

- [ ] Basic communication works
- [ ] Task delegation works
- [ ] Task Master integration works
- [ ] Error handling works
- [ ] All agents respond appropriately
- [ ] Message format is consistent

## Notes

Record any issues or observations during testing.