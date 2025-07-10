const fs = require('fs-extra');
const path = require('path');

async function loadTemplateFiles(options = {}) {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templates = {};

  // Load agent instructions - now consolidated to single efficient versions
  const agentInstructionsDir = path.join(templatesDir, 'agent-instructions');
  templates['.cursor/rules/amos/agent-instructions/BOOTSTRAP.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'BOOTSTRAP.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/MANAGER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'MANAGER.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/PLANNER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'PLANNER.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/WORKER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'WORKER.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/WORKFLOW_PHASES.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'WORKFLOW_PHASES.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/SUBAGENT_MANAGER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'SUBAGENT_MANAGER.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/PARALLEL_DELEGATION.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'PARALLEL_DELEGATION.mdc'), 'utf8');

  // Load project data - now includes advanced memory architecture
  const projectDataDir = path.join(templatesDir, 'project-data');
  templates['.cursor/rules/amos/project-data/system_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'system_state.mdc'), 'utf8');
  templates['.cursor/rules/amos/project-data/project_brief.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_brief.mdc'), 'utf8');
  
  // Advanced memory architecture (inspired by cursorkleosr)
  templates['.cursor/rules/amos/project-data/amos_config.mdc'] = await fs.readFile(path.join(projectDataDir, 'amos_config.mdc'), 'utf8');
  templates['.cursor/rules/amos/project-data/agent_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'agent_state.mdc'), 'utf8');
  
  // Claude optimization features (inspired by claudelog.com)
  templates['.cursor/rules/amos/project-data/context_management.mdc'] = await fs.readFile(path.join(projectDataDir, 'context_management.mdc'), 'utf8');
  
  if (!options.simple) {
    templates['.cursor/rules/amos/project-data/workflow_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'workflow_state.mdc'), 'utf8');
  }

  // Load tool integrations (skip heavy docs in simple mode)
  if (!options.simple) {
    const toolIntegrationsDir = path.join(templatesDir, 'tool-integrations');
    templates['.cursor/rules/amos/tool-integrations/task_master.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'task_master.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/github_integration.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'github_integration.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/cursor_rules.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'cursor_rules.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/mcp_servers.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'mcp_servers.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/terminal_management.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'terminal_management.md'), 'utf8');

    // Load monitoring templates
    const monitoringDir = path.join(templatesDir, 'monitoring');
    templates['.cursor/rules/amos/monitoring/token_tracking.mdc'] = await fs.readFile(path.join(monitoringDir, 'token_tracking.mdc'), 'utf8');

    // Load communication templates
    const communicationDir = path.join(templatesDir, 'communication');
    templates['.cursor/rules/amos/communication/tmux_protocols.mdc'] = await fs.readFile(path.join(communicationDir, 'tmux_protocols.mdc'), 'utf8');
    templates['.cursor/rules/amos/communication/doc_maintenance.mdc'] = await fs.readFile(path.join(communicationDir, 'doc_maintenance.mdc'), 'utf8');
    templates['.cursor/rules/amos/communication/claude_subagents.mdc'] = await fs.readFile(path.join(communicationDir, 'claude_subagents.mdc'), 'utf8');
  } else {
    // Simple mode - load essential communication only
    const communicationDir = path.join(templatesDir, 'communication');
    templates['.cursor/rules/amos/communication/tmux_protocols.mdc'] = await fs.readFile(path.join(communicationDir, 'tmux_protocols.mdc'), 'utf8');
  }

  // Load command templates (slash commands)
  if (!options.simple) {
    const commandsDir = path.join(templatesDir, 'commands');
    templates['.claude/commands/amos-start.md'] = await fs.readFile(path.join(commandsDir, 'amos-start.md'), 'utf8');
    templates['.claude/commands/amos-status.md'] = await fs.readFile(path.join(commandsDir, 'amos-status.md'), 'utf8');
  }

  // Load scripts
  const scriptsDir = path.join(templatesDir, 'scripts');
  templates['scripts/agent_sanity_check.sh'] = await fs.readFile(path.join(scriptsDir, 'agent_sanity_check.sh'), 'utf8');
  templates['scripts/start_workflow.sh'] = await fs.readFile(path.join(scriptsDir, 'start_workflow.sh'), 'utf8');

  return templates;
}

module.exports = { loadTemplateFiles };