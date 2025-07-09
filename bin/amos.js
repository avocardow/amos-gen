#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const { generateProject } = require('../lib/commands/gen');

program
  .name('amos')
  .description('AMOS (Agentic Multi-Orchestration System) Generator')
  .version('1.1.2');

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

program
  .command('check')
  .description('Check system requirements for AMOS')
  .action(async () => {
    try {
      console.log(chalk.blue('🔍 Checking system requirements...'));
      await checkSystemRequirements();
    } catch (error) {
      console.error(chalk.red('❌ Error checking system:'), error.message);
      process.exit(1);
    }
  });

async function checkSystemRequirements() {
  const { spawn } = require('child_process');
  
  console.log(chalk.yellow('Checking required dependencies:'));
  
  // Check Node.js version
  const nodeVersion = process.version;
  console.log(chalk.green('✅ Node.js:'), nodeVersion);
  
  // Check if tmux is installed
  const tmuxCheck = spawn('tmux', ['-V'], { stdio: 'pipe' });
  
  tmuxCheck.on('close', (code) => {
    if (code === 0) {
      console.log(chalk.green('✅ tmux: Available'));
    } else {
      console.log(chalk.red('❌ tmux: Not found'));
      console.log(chalk.yellow('  Install with: brew install tmux (macOS) or apt-get install tmux (Ubuntu)'));
    }
  });
  
  tmuxCheck.on('error', () => {
    console.log(chalk.red('❌ tmux: Not found'));
    console.log(chalk.yellow('  Install with: brew install tmux (macOS) or apt-get install tmux (Ubuntu)'));
  });
  
  // Check if git is available
  const gitCheck = spawn('git', ['--version'], { stdio: 'pipe' });
  
  gitCheck.on('close', (code) => {
    if (code === 0) {
      console.log(chalk.green('✅ git: Available'));
    } else {
      console.log(chalk.yellow('⚠️  git: Not found (optional for basic usage)'));
    }
  });
  
  gitCheck.on('error', () => {
    console.log(chalk.yellow('⚠️  git: Not found (optional for basic usage)'));
  });
  
  console.log(chalk.blue('\nSystem check complete!'));
}

program.parse();