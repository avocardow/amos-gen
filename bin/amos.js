#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { generateProject } = require('../lib/commands/gen');

program
  .name('amos')
  .description('AMOS (Agentic Multi-Orchestration System) Generator')
  .version('1.0.0');

program
  .command('gen')
  .description('Generate a new AMOS project structure')
  .argument('[project-name]', 'Name of the project directory to create')
  .action(async (projectName) => {
    try {
      console.log(chalk.blue('🚀 AMOS Generator starting...'));
      await generateProject(projectName);
      console.log(chalk.green('✅ AMOS project generated successfully!'));
      console.log(chalk.yellow('\nNext steps:'));
      console.log(chalk.cyan('1. cd ' + (projectName || 'amos-project')));
      console.log(chalk.cyan('2. ./scripts/start_workflow.sh'));
      console.log(chalk.cyan('3. Load agent instructions into each tmux pane'));
    } catch (error) {
      console.error(chalk.red('❌ Error generating project:'), error.message);
      process.exit(1);
    }
  });

program.parse();