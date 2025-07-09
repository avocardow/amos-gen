# GitHub Integration

## Overview
GitHub CLI integration for repository management within AMOS workflow.

## Setup
```bash
gh auth login
gh repo clone <repository>
```

## Key Commands
- `gh pr create` - Create pull request
- `gh issue create` - Create new issue
- `gh pr status` - Check PR status
- `gh repo view` - View repository info

## Manager Integration
```bash
# Create PR for completed work
gh pr create --title "$(task-master show <id> --format=title)" --body "Completed task <id>"

# Assign issues to agents
tmux send-keys -t WORKER "MANAGER: Work on issue #$(gh issue create --title 'New feature' --body 'Details')" C-m
```