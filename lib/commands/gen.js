const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

async function generateProject(projectName) {
  const targetDir = projectName || 'amos-project';
  const projectPath = path.resolve(process.cwd(), targetDir);

  // Check if directory already exists
  if (await fs.pathExists(projectPath)) {
    const { overwrite } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message: `Directory '${targetDir}' already exists. Overwrite?`,
        default: false
      }
    ]);

    if (!overwrite) {
      console.log(chalk.yellow('Operation cancelled.'));
      return;
    }

    await fs.remove(projectPath);
  }

  console.log(chalk.blue(`Creating project structure in ${targetDir}...`));

  // Create directory structure
  await createDirectoryStructure(projectPath);
  
  // Generate all template files
  await generateTemplateFiles(projectPath);
  
  console.log(chalk.green(`Project '${targetDir}' created successfully!`));
}

async function createDirectoryStructure(projectPath) {
  const directories = [
    '.cursor/rules/amos/agent-instructions',
    '.cursor/rules/amos/project_data',
    'scripts',
    'src'
  ];

  for (const dir of directories) {
    await fs.ensureDir(path.join(projectPath, dir));
  }
}

async function generateTemplateFiles(projectPath) {
  const templates = require('../templates');
  
  for (const [filePath, content] of Object.entries(templates)) {
    const fullPath = path.join(projectPath, filePath);
    await fs.outputFile(fullPath, content);
    
    // Make shell scripts executable
    if (filePath.endsWith('.sh')) {
      await fs.chmod(fullPath, '755');
    }
  }
}

module.exports = { generateProject };