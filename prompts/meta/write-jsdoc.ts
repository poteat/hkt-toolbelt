import { Project } from 'ts-morph'
import * as readline from 'readline'

if (process.argv.length !== 4) {
  console.error('Usage: ts-node write-jsdoc.ts <filepath> <identifier>')
  process.exit(1)
}

const filepath = process.argv[2]
const identifier = process.argv[3]

// Read JSDoc from stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
})

let jsDoc = ''

rl.on('line', line => {
  jsDoc += line + '\n'
})

rl.on('close', () => {
  // Create a ts-morph project and add the file
  const project = new Project()
  const sourceFile = project.addSourceFileAtPath(filepath)

  if (!sourceFile) {
    console.error(`Could not find file: ${filepath}`)
    process.exit(1)
  }

  const exports = sourceFile.getExportedDeclarations()

  if (!exports.has(identifier)) {
    console.error(`Could not find identifier: ${identifier}`)
    process.exit(1)
  }

  // Find the identifier and get the line number
  const declaration = exports.get(identifier)?.[0]

  if (!declaration) {
    console.error(`Could not find identifier: ${identifier}`)
    process.exit(1)
  }

  const lineNumber = declaration.getNonWhitespaceStart()

  // Insert the JSDoc before the declaration
  sourceFile.insertText(lineNumber, jsDoc)

  // Save the changes to the file
  sourceFile.saveSync()
})
