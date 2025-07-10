#!/bin/bash

# 🔒 AMOS Workspace Isolation - Prevent agent conflicts through git worktrees + tmux sessions
# Inspired by: https://github.com/hesreallyhim/awesome-claude-code

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Configuration
COORDINATION_DIR=".amos/coordination"
WORKTREE_DIR="../amos-agents"
SESSION_PREFIX="AMOS"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[AMOS]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

# Initialize coordination system
init_coordination() {
    log "Initializing AMOS coordination system..."
    
    mkdir -p "$COORDINATION_DIR"/{locks,registry,queue}
    mkdir -p "$WORKTREE_DIR"
    
    # Create coordination files if they don't exist
    [[ ! -f "$COORDINATION_DIR/active_agents.json" ]] && echo '{}' > "$COORDINATION_DIR/active_agents.json"
    [[ ! -f "$COORDINATION_DIR/file_locks.json" ]] && echo '{}' > "$COORDINATION_DIR/file_locks.json"
    [[ ! -f "$COORDINATION_DIR/work_queue.json" ]] && echo '[]' > "$COORDINATION_DIR/work_queue.json"
    
    success "Coordination system initialized"
}

# Create isolated workspace for agent
create_agent_workspace() {
    local agent_role="$1"
    local task_id="${2:-$(date +%s)}"
    local agent_id="${agent_role}_${task_id}"
    local branch_name="amos/${agent_role,,}/${task_id}"
    local workspace_path="$WORKTREE_DIR/${agent_id}"
    local session_name="${SESSION_PREFIX}_${agent_role}"
    
    log "Creating isolated workspace for $agent_role..."
    
    # Create git worktree
    if [[ ! -d "$workspace_path" ]]; then
        git worktree add "$workspace_path" -b "$branch_name" 2>/dev/null || {
            warn "Branch $branch_name exists, checking out..."
            git worktree add "$workspace_path" "$branch_name"
        }
        success "Created worktree: $workspace_path"
    else
        warn "Workspace already exists: $workspace_path"
    fi
    
    # Create tmux session
    if ! tmux has-session -t "$session_name" 2>/dev/null; then
        tmux new-session -d -s "$session_name" -c "$workspace_path"
        tmux send-keys -t "$session_name" "echo 'AMOS $agent_role Agent Ready'" C-m
        tmux send-keys -t "$session_name" "echo 'Workspace: $workspace_path'" C-m
        tmux send-keys -t "$session_name" "echo 'Branch: $branch_name'" C-m
        success "Created tmux session: $session_name"
    else
        warn "Session already exists: $session_name"
    fi
    
    # Register agent
    register_agent "$agent_id" "$agent_role" "$workspace_path" "$branch_name" "$session_name"
    
    echo "$agent_id"
}

# Register agent in coordination system
register_agent() {
    local agent_id="$1"
    local role="$2" 
    local workspace="$3"
    local branch="$4"
    local session="$5"
    local timestamp="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    
    # Update active agents registry
    local temp_file=$(mktemp)
    jq --arg id "$agent_id" \
       --arg role "$role" \
       --arg workspace "$workspace" \
       --arg branch "$branch" \
       --arg session "$session" \
       --arg timestamp "$timestamp" \
       '.[$id] = {
           "role": $role,
           "workspace": $workspace, 
           "branch": $branch,
           "session": $session,
           "status": "active",
           "created": $timestamp,
           "last_seen": $timestamp
       }' "$COORDINATION_DIR/active_agents.json" > "$temp_file"
    
    mv "$temp_file" "$COORDINATION_DIR/active_agents.json"
    success "Registered agent: $agent_id"
}

# Claim file for exclusive access
claim_file() {
    local agent_id="$1"
    local file_path="$2"
    local description="$3"
    local timestamp="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    
    # Check if file is already claimed
    local current_owner
    current_owner=$(jq -r --arg file "$file_path" '.[$file].agent_id // empty' "$COORDINATION_DIR/file_locks.json")
    
    if [[ -n "$current_owner" && "$current_owner" != "$agent_id" ]]; then
        error "File $file_path is already claimed by $current_owner"
        return 1
    fi
    
    # Claim the file
    local temp_file=$(mktemp)
    jq --arg file "$file_path" \
       --arg agent "$agent_id" \
       --arg desc "$description" \
       --arg timestamp "$timestamp" \
       '.[$file] = {
           "agent_id": $agent,
           "description": $desc,
           "claimed_at": $timestamp,
           "status": "locked"
       }' "$COORDINATION_DIR/file_locks.json" > "$temp_file"
    
    mv "$temp_file" "$COORDINATION_DIR/file_locks.json"
    success "Claimed file: $file_path for $agent_id"
}

# Release file lock
release_file() {
    local agent_id="$1"
    local file_path="$2"
    
    local temp_file=$(mktemp)
    jq --arg file "$file_path" \
       --arg agent "$agent_id" \
       'if (.[$file].agent_id == $agent) then del(.[$file]) else . end' \
       "$COORDINATION_DIR/file_locks.json" > "$temp_file"
    
    mv "$temp_file" "$COORDINATION_DIR/file_locks.json"
    success "Released file: $file_path"
}

# List active agents
list_agents() {
    log "Active AMOS agents:"
    jq -r 'to_entries[] | "  \(.key): \(.value.role) (\(.value.status)) - \(.value.session)"' \
       "$COORDINATION_DIR/active_agents.json" 2>/dev/null || echo "  No active agents"
}

# List claimed files
list_locks() {
    log "File locks:"
    jq -r 'to_entries[] | "  \(.key): \(.value.agent_id) - \(.value.description)"' \
       "$COORDINATION_DIR/file_locks.json" 2>/dev/null || echo "  No files locked"
}

# Clean up agent workspace
cleanup_agent() {
    local agent_id="$1"
    local agent_data
    
    agent_data=$(jq -r --arg id "$agent_id" '.[$id] // empty' "$COORDINATION_DIR/active_agents.json")
    
    if [[ -z "$agent_data" ]]; then
        error "Agent $agent_id not found"
        return 1
    fi
    
    local session workspace branch
    session=$(echo "$agent_data" | jq -r '.session')
    workspace=$(echo "$agent_data" | jq -r '.workspace')
    branch=$(echo "$agent_data" | jq -r '.branch')
    
    log "Cleaning up agent: $agent_id"
    
    # Kill tmux session
    if tmux has-session -t "$session" 2>/dev/null; then
        tmux kill-session -t "$session"
        success "Killed session: $session"
    fi
    
    # Remove worktree
    if [[ -d "$workspace" ]]; then
        git worktree remove "$workspace" --force
        success "Removed worktree: $workspace"
    fi
    
    # Remove from registry
    local temp_file=$(mktemp)
    jq --arg id "$agent_id" 'del(.[$id])' "$COORDINATION_DIR/active_agents.json" > "$temp_file"
    mv "$temp_file" "$COORDINATION_DIR/active_agents.json"
    
    # Release any files claimed by this agent
    local temp_file2=$(mktemp)
    jq --arg agent "$agent_id" 'with_entries(select(.value.agent_id != $agent))' \
       "$COORDINATION_DIR/file_locks.json" > "$temp_file2"
    mv "$temp_file2" "$COORDINATION_DIR/file_locks.json"
    
    success "Cleaned up agent: $agent_id"
}

# Main command dispatcher
main() {
    case "${1:-}" in
        "init")
            init_coordination
            ;;
        "create")
            [[ $# -lt 2 ]] && { error "Usage: $0 create <MANAGER|PLANNER|WORKER> [task_id]"; exit 1; }
            create_agent_workspace "$2" "${3:-}"
            ;;
        "claim")
            [[ $# -lt 4 ]] && { error "Usage: $0 claim <agent_id> <file_path> <description>"; exit 1; }
            claim_file "$2" "$3" "$4"
            ;;
        "release")
            [[ $# -lt 3 ]] && { error "Usage: $0 release <agent_id> <file_path>"; exit 1; }
            release_file "$2" "$3"
            ;;
        "list")
            list_agents
            echo
            list_locks
            ;;
        "cleanup")
            [[ $# -lt 2 ]] && { error "Usage: $0 cleanup <agent_id>"; exit 1; }
            cleanup_agent "$2"
            ;;
        "help"|"--help"|"-h")
            cat << EOF
AMOS Workspace Isolation - Prevent agent conflicts

Usage: $0 <command> [options]

Commands:
  init                                 Initialize coordination system
  create <ROLE> [task_id]             Create isolated workspace for agent
  claim <agent_id> <file> <desc>      Claim file for exclusive access
  release <agent_id> <file>           Release file lock
  list                                List active agents and locks
  cleanup <agent_id>                  Clean up agent workspace
  help                                Show this help

Examples:
  $0 init
  $0 create MANAGER
  $0 create WORKER auth_feature
  $0 claim WORKER_123 src/auth.ts "Implementing login"
  $0 list
  $0 cleanup WORKER_123

Coordination files stored in: $COORDINATION_DIR
Agent workspaces created in: $WORKTREE_DIR
EOF
            ;;
        *)
            error "Unknown command: ${1:-}"
            echo "Use '$0 help' for usage information"
            exit 1
            ;;
    esac
}

# Ensure we're in a git repository
if ! git rev-parse --git-dir > /dev/null 2>&1; then
    error "This script must be run from within a git repository"
    exit 1
fi

main "$@"