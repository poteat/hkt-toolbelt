import * as glob from 'glob'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import fs from 'fs'

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
  .help()
  .alias('help', 'h').argv

const files = glob.sync(argv.pattern)
const commands = files.map((file) => {
  const specFile = file.replace('.ts', '.spec.ts')
  let command = argv.template
  if (fs.existsSync(specFile)) {
    command = command.replace('{s}', file).replace('{t}', specFile)
  } else {
    command = command.replace('{s}', file).replace('{t}', '')
  }
  return command
})

console.log('The following commands will be run:')
console.log(commands.join('\n'))

inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'proceed',
      message: 'Do you want to proceed?',
      default: false
    }
  ])
  .then((answers) => {
    if (answers.proceed) {
      commands.forEach((command) => {
        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
            return
          }
          console.log(`stdout: ${stdout}`)
          console.error(`stderr: ${stderr}`)
        })
      })
    }
  })
