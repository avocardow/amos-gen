const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const inquirer = require('inquirer');

async function generateProject(projectName) {
  const targetDir = projectName || 'amos-project';
  
  // Validate project name
  if (projectName && !isValidProjectName(projectName)) {
    throw new Error('Invalid project name. Use only letters, numbers, hyphens, and underscores.');
  }
  
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
    '.cursor/rules/amos/project-data',
    '.cursor/rules/amos/tool-integrations',
    '.cursor/rules/amos/living-docs',
    '.cursor/rules/amos/communication',
    'scripts',
    'src'
  ];

  for (const dir of directories) {
    await fs.ensureDir(path.join(projectPath, dir));
  }
}

async function generateTemplateFiles(projectPath) {
  try {
    const { loadTemplateFiles } = require('../utils/file-loader');
    const templates = await loadTemplateFiles();
    
    for (const [filePath, content] of Object.entries(templates)) {
      const fullPath = path.join(projectPath, filePath);
      await fs.outputFile(fullPath, content);
      
      // Make shell scripts executable
      if (filePath.endsWith('.sh')) {
        await fs.chmod(fullPath, '755');
      }
    }
  } catch (error) {
    throw new Error(`Failed to generate template files: ${error.message}`);
  }
}

function isValidProjectName(name) {
  // Allow letters, numbers, hyphens, underscores, and periods
  // Disallow reserved names and special characters
  const validPattern = /^[a-zA-Z0-9._-]+$/;
  const reservedNames = ['node_modules', 'src', 'lib', 'test', 'build', 'dist', 'con', 'prn', 'aux', 'nul'];
  
  return validPattern.test(name) && 
         !reservedNames.includes(name.toLowerCase()) && 
         name.length > 0 && 
         name.length < 100;
}

module.exports = { generateProject };