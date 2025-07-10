const fs = require('fs-extra');
const path = require('path');

async function loadTemplateFiles(options = {}) {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templates = {};

  // Load agent instructions - always include bootstrap
  const agentInstructionsDir = path.join(templatesDir, 'agent-instructions');
  templates['.cursor/rules/amos/agent-instructions/BOOTSTRAP.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'BOOTSTRAP.mdc'), 'utf8');
  
  if (options.simple) {
    // Use concise versions for better context efficiency
    templates['.cursor/rules/amos/agent-instructions/MANAGER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'MANAGER_CONCISE.mdc'), 'utf8');
    templates['.cursor/rules/amos/agent-instructions/PLANNER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'PLANNER_CONCISE.mdc'), 'utf8');
    templates['.cursor/rules/amos/agent-instructions/WORKER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'WORKER_CONCISE.mdc'), 'utf8');
  } else {
    templates['.cursor/rules/amos/agent-instructions/MANAGER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'MANAGER.mdc'), 'utf8');
    templates['.cursor/rules/amos/agent-instructions/PLANNER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'PLANNER.mdc'), 'utf8');
    templates['.cursor/rules/amos/agent-instructions/WORKER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'WORKER.mdc'), 'utf8');
  }

  // Load project data
  const projectDataDir = path.join(templatesDir, 'project-data');
  if (options.simple) {
    templates['.cursor/rules/amos/project-data/project_brief.mdc'] = await fs.readFile(path.join(projectDataDir, 'simple_project.mdc'), 'utf8');
    templates['.cursor/rules/amos/project-data/system_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'system_state_simple.mdc'), 'utf8');
  } else {
    templates['.cursor/rules/amos/project-data/project_config.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_config.mdc'), 'utf8');
    templates['.cursor/rules/amos/project-data/project_brief.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_brief.mdc'), 'utf8');
    templates['.cursor/rules/amos/project-data/workflow_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'workflow_state.mdc'), 'utf8');
    templates['.cursor/rules/amos/project-data/system_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'system_state.mdc'), 'utf8');
  }

  // Load tool integrations (skip heavy docs in simple mode)
  if (!options.simple) {
    const toolIntegrationsDir = path.join(templatesDir, 'tool-integrations');
    templates['.cursor/rules/amos/tool-integrations/task_master.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'task_master.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/github_integration.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'github_integration.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/cursor_rules.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'cursor_rules.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/mcp_servers.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'mcp_servers.md'), 'utf8');
    templates['.cursor/rules/amos/tool-integrations/terminal_management.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'terminal_management.md'), 'utf8');

    // Load communication templates
    const communicationDir = path.join(templatesDir, 'communication');
    templates['.cursor/rules/amos/communication/tmux_protocols.mdc'] = await fs.readFile(path.join(communicationDir, 'tmux_protocols.mdc'), 'utf8');
    templates['.cursor/rules/amos/communication/doc_maintenance.mdc'] = await fs.readFile(path.join(communicationDir, 'doc_maintenance.mdc'), 'utf8');
  } else {
    // Simple mode uses concise communication
    const communicationDir = path.join(templatesDir, 'communication');
    templates['.cursor/rules/amos/communication/tmux_protocols.mdc'] = await fs.readFile(path.join(communicationDir, 'tmux_simple.mdc'), 'utf8');
  }

  // Load scripts
  const scriptsDir = path.join(templatesDir, 'scripts');
  templates['scripts/agent_sanity_check.sh'] = await fs.readFile(path.join(scriptsDir, 'agent_sanity_check.sh'), 'utf8');
  
  // Always use simplified workflow script
  templates['scripts/start_workflow.sh'] = await fs.readFile(path.join(scriptsDir, 'start_workflow_simple.sh'), 'utf8');

  return templates;
}

module.exports = { loadTemplateFiles };