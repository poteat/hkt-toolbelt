import * as glob from 'glob'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import fs from 'fs'
import chalk from 'chalk'
import util from 'util'

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option('pattern', {
    alias: 'p',
    description: 'Glob pattern for input files',
    type: 'string',
    demandOption: true
  })
  .option('template', {
    alias: 't',
    description: 'Script template',
    type: 'string',
    demandOption: true
  })
  .option('extraFiles', {
    alias: 'e',
    description: 'Extra content files',
    type: 'array',
    default: []
  })
  .help()
  .alias('help', 'h').argv

const ignorePatterns = fs.existsSync('.multi-aider-ignore')
  ? fs.readFileSync('.multi-aider-ignore', 'utf-8').split('\n')
  : []

const files = glob.sync(argv.pattern, { ignore: ignorePatterns })
function replacePlaceholders(
  template: string,
  placeholders: Record<string, string>
): string {
  let result = template
  for (const [placeholder, value] of Object.entries(placeholders)) {
    result = result.replace(`{${placeholder}}`, value)
  }
  return result
}

function checkSpecFile(file: string, specFile: string, template: string): string | null {
  if (fs.existsSync(specFile)) {
    return specFile;
  } else if (template.includes('{t}')) {
    console.warn(
      chalk.red(
        `Warning: Skipping command for ${file} as no corresponding spec file exists and the template uses {t}`
      )
    )
    return null;
  }
  return '';
}

function generateCommand(
  file: string,
  specFile: string,
  template: string,
  extraFiles: string[]
): string {
  const specFileChecked = checkSpecFile(file, specFile, template);
  if (specFileChecked === null) {
    return '';
  }

  let placeholders = { s: file, t: specFileChecked } as Record<string, string>
  extraFiles.forEach((extraFile: string) => {
    placeholders[extraFile] = extraFile
  })
  let command = replacePlaceholders(template, placeholders)
  return ['aider', `--msg="${command}"`, file, specFile, ...extraFiles].join(
    '\\\n  '
  )
}

const commands = files.reduce((acc: string[], file) => {
  const specFile = file.replace('.ts', '.spec.ts')
  const command = generateCommand(
    file,
    specFile,
    argv.template,
    argv.extraFiles
  )
  if (command) {
    acc.push(command)
  }
  return acc
}, [])

console.log('The following commands will be run:')
console.log(commands.join('\n\n'))

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Do you want to proceed?',
      default: false
    }
  ])
  .then(async (answers) => {
    if (answers.proceed) {
      const execPromisified = util.promisify(exec)
      for (const command of commands) {
        try {
          const { stdout, stderr } = await execPromisified(
            command.split('\n  ').join(' ')
          )
          console.log(`stdout: ${stdout}`)
          console.error(`stderr: ${stderr}`)
        } catch (error) {
          console.error(`Error executing command: ${command}`)
          console.error(`exec error: ${error}`)
          throw error
        }
      }
    }
  })
