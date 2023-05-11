import { Project } from 'ts-morph'

function main() {
  // Create a new ts-morph project
  const project = new Project()

  const arg = process.argv[2]

  // Add the input file to the ts-morph project
  const sourceFile = project.addSourceFileAtPath(arg)

  // Extract all the exported identifiers
  const stdoutLines: string[] = []
  const exports = sourceFile.getExportedDeclarations()

  for (const [identifier, declarations] of exports) {
    stdoutLines.push(identifier)
  }

  // Output the newline-delimited list of exported identifiers
  console.log(stdoutLines.join('\n'))
}

main()
