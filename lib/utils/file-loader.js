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
  const projectDataDir = path.join(templatesDir, 'project-data');
  templates['.cursor/rules/amos/project-data/project_config.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_config.mdc'), 'utf8');
  templates['.cursor/rules/amos/project-data/project_brief.mdc'] = await fs.readFile(path.join(projectDataDir, 'project_brief.mdc'), 'utf8');
  templates['.cursor/rules/amos/project-data/workflow_state.mdc'] = await fs.readFile(path.join(projectDataDir, 'workflow_state.mdc'), 'utf8');

  // Load tool integrations (keeping .md extension for these)
  const toolIntegrationsDir = path.join(templatesDir, 'tool-integrations');
  templates['.cursor/rules/amos/tool-integrations/task_master.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'task_master.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/github_integration.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'github_integration.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/cursor_rules.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'cursor_rules.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/mcp_servers.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'mcp_servers.md'), 'utf8');
  templates['.cursor/rules/amos/tool-integrations/terminal_management.md'] = await fs.readFile(path.join(toolIntegrationsDir, 'terminal_management.md'), 'utf8');

  // Load communication templates (now .mdc files)
  const communicationDir = path.join(templatesDir, 'communication');
  templates['.cursor/rules/amos/communication/tmux_protocols.mdc'] = await fs.readFile(path.join(communicationDir, 'tmux_protocols.mdc'), 'utf8');
  templates['.cursor/rules/amos/communication/doc_maintenance.mdc'] = await fs.readFile(path.join(communicationDir, 'doc_maintenance.mdc'), 'utf8');

  // Load living-docs templates (now .mdc files)
  const livingDocsDir = path.join(templatesDir, 'living-docs');
  templates['.cursor/rules/amos/living-docs/codebase_map.mdc'] = await fs.readFile(path.join(livingDocsDir, 'codebase_map.mdc'), 'utf8');
  templates['.cursor/rules/amos/living-docs/roadmap.mdc'] = await fs.readFile(path.join(livingDocsDir, 'roadmap.mdc'), 'utf8');
  templates['.cursor/rules/amos/living-docs/tech_stack.mdc'] = await fs.readFile(path.join(livingDocsDir, 'tech_stack.mdc'), 'utf8');

  // Load scripts
  const scriptsDir = path.join(templatesDir, 'scripts');
  templates['scripts/start_workflow.sh'] = await fs.readFile(path.join(scriptsDir, 'start_workflow.sh'), 'utf8');

  return templates;
}

module.exports = { loadTemplateFiles };