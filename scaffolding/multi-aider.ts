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

function checkSpecFile(
  file: string,
  specFile: string,
  template: string
): string | null {
  if (fs.existsSync(specFile)) {
    return specFile
  } else if (template.includes('{t}')) {
    console.warn(
      chalk.red(
        `Warning: Skipping command for ${file} as no corresponding spec file exists and the template uses {t}`
      )
    )
    return null
  }
  return ''
}

function generatePlaceholders(
  file: string,
  specFile: string,
  extraFiles: string[]
): Record<string, string> {
  let placeholders = { s: file, t: specFile } as Record<string, string>
  extraFiles.forEach((extraFile: string) => {
    placeholders[extraFile] = extraFile
  })
  return placeholders
}

function generateCommand(
  file: string,
  specFile: string,
  template: string,
  extraFiles: string[]
): string | null {
  const specFileChecked = checkSpecFile(file, specFile, template)
  if (specFileChecked === null) {
    console.error(
      `Error: No corresponding spec file exists for ${file} and the template uses {t}.`
    )
    return null
  }

  let placeholders = generatePlaceholders(file, specFileChecked, extraFiles)
  let command = replacePlaceholders(template, placeholders)
  return ['aider', `--msg="${command}"`, file, specFile, ...extraFiles].join(
    '\\\n  '
  )
}

function generateCommands(
  files: string[],
  template: string,
  extraFiles: string[]
): string[] {
  return files
    .map(file => {
      const specFile = file.replace('.ts', '.spec.ts')
      return generateCommand(file, specFile, template, extraFiles)
    })
    .filter(command => command !== null) as string[]
}

const commands = generateCommands(files, argv.template, argv.extraFiles)

async function executeCommand(command: string) {
  const execPromisified = util.promisify(exec)
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

async function promptUser(commands: string[]) {
  if (commands.length === 0) {
    console.log('No commands to execute.')
    return
  }

  console.log('The following commands will be run:')
  console.log(commands.join('\n\n'))

  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Do you want to proceed?',
      default: false
    }
  ])

  if (answers.proceed) {
    for (const command of commands) {
      await executeCommand(command)
    }
  }
}

promptUser(commands)
