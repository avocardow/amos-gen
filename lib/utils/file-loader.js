const fs = require('fs-extra');
const path = require('path');

async function loadTemplateFiles() {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templates = {};

  // Load agent instructions (now .mdc files)
  const agentInstructionsDir = path.join(templatesDir, 'agent-instructions');
  templates['.cursor/rules/amos/agent-instructions/MANAGER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'MANAGER.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/PLANNER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'PLANNER.mdc'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/WORKER.mdc'] = await fs.readFile(path.join(agentInstructionsDir, 'WORKER.mdc'), 'utf8');

  // Load project data (now .mdc files)
  const projectDataDir = path.join(templatesDir, 'project_data');
  templates['.cursor/rules/amos/project_data/project_config.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_config.mdc'), 'utf8');
  templates['.cursor/rules/amos/project_data/project_brief.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_brief.mdc'), 'utf8');
  templates['.cursor/rules/amos/project_data/workflow_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'workflow_state.mdc'), 'utf8');

  // Load tool integrations (keeping .md extension for these)
  const toolIntegrationsDir = path.join(templatesDir, 'tool-integrations');
  templates['.cursor/rules/amos/tool-integrations/task_master.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'task_master.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/github_integration.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'github_integration.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/cursor_rules.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'cursor_rules.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/mcp_servers.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'mcp_servers.md'), 'utf8');

  // Load scripts
  const scriptsDir = path.join(templatesDir, 'scripts');
  templates['scripts/start_workflow.sh'] = await fs.readFile(path.join(scriptsDir, 'start_workflow.sh'), 'utf8');

  return templates;
}

module.exports = { loadTemplateFiles };