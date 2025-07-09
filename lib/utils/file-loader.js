const fs = require('fs-extra');
const path = require('path');

async function loadTemplateFiles() {
  const templatesDir = path.join(__dirname, '..', 'templates');
  const templates = {};

  // Load agent instructions
  const agentInstructionsDir = path.join(templatesDir, 'agent-instructions');
  templates['.cursor/rules/amos/agent-instructions/MANAGER.md'] = await fs.readFile(path.join(agentInstructionsDir, 'MANAGER.md'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/PLANNER.md'] = await fs.readFile(path.join(agentInstructionsDir, 'PLANNER.md'), 'utf8');
  templates['.cursor/rules/amos/agent-instructions/WORKER.md'] = await fs.readFile(path.join(agentInstructionsDir, 'WORKER.md'), 'utf8');

  // Load project data
  const projectDataDir = path.join(templatesDir, 'project_data');
  templates['.cursor/rules/amos/project_data/project_config.md'] = await fs.readFile(path.join(projectDataDir, 'project_config.md'), 'utf8');
  templates['.cursor/rules/amos/project_data/project_brief.md'] = await fs.readFile(path.join(projectDataDir, 'project_brief.md'), 'utf8');
  templates['.cursor/rules/amos/project_data/workflow_state.md'] = await fs.readFile(path.join(projectDataDir, 'workflow_state.md'), 'utf8');

  // Load tool integrations
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