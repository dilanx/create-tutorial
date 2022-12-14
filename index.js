#!/usr/bin/env node

const prompts = require('prompts');
const { green, reset, red, yellow, blue } = require('kolorist');
const path = require('path');
const fs = require('fs');

const projects = [
  {
    name: 'tutorial-react-wordle',
    cli: 'wordle',
    color: green,
    variants: [
      {
        name: 'js',
        display: 'JavaScript',
        color: yellow,
      },
      {
        name: 'ts',
        display: 'TypeScript',
        color: blue,
      },
      {
        name: 'completed',
        display: 'Completed',
        color: green,
      },
    ],
  },
];

const fileRename = {
  _gitignore: '.gitignore',
};

async function init() {
  const argName = process.argv[2];

  let argProject;

  if (argName) {
    argProject = projects.find(
      (project) => (project.cli || project.name) === argName
    );
    if (!argProject) {
      console.log(red(`Project ${argName} not found.`));
      process.exit(1);
    }
    console.log(`Using tutorial project ${green(argProject.name)}.`);
  }

  let { project, variant } = await prompts(
    [
      {
        type: argProject ? null : 'autocomplete',
        name: 'project',
        message: reset('Select a tutorial project'),
        initial: argProject || 0,
        choices: projects.map((project) => ({
          title: project.color(project.display || project.name),
          value: project,
        })),
      },
      {
        type: 'select',
        name: 'variant',
        message: reset('Select a variant'),
        initial: 0,
        choices: (project) =>
          (argProject || project).variants.map((variant) => ({
            title: variant.color(variant.display || variant.name),
            value: variant.name,
          })),
      },
    ],
    {
      onCancel: () => {
        console.log(red('Bye.'));
        process.exit(0);
      },
    }
  );

  project = argProject ? argProject.name : project.name;

  const template = `${project}-${variant}`;

  const root = path.join(process.cwd(), template);

  if (fs.existsSync(root)) {
    console.log(red(`Directory ${template} already exists.`));
    process.exit(1);
  }

  fs.mkdirSync(root, { recursive: true });

  console.log(yellow(`\nInitializing your project in ${root}...`));

  const templatePath = path.join(__dirname, template);

  const files = fs.readdirSync(templatePath);
  for (const file of files) {
    const dst = path.join(root, fileRename[file] || file);
    copy(path.join(templatePath, file), dst);
  }

  console.log(green(`Done! Run the commands below to get started.\n`));
  console.log(`  cd ${path.relative(process.cwd(), root)}`);
  console.log(`  npm install`);
  console.log(`  npm run dev`);
  console.log();
}

function copy(src, dst) {
  const stat = fs.statSync(src);

  if (stat.isDirectory()) {
    fs.mkdirSync(dst, { recursive: true });
    fs.readdirSync(src).forEach((file) => {
      copy(path.resolve(src, file), path.resolve(dst, file));
    });
  } else {
    fs.copyFileSync(src, dst);
  }
}

init().catch(console.error);
