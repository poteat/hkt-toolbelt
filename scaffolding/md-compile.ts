#!/usr/bin/env ts-node

import { promisify } from 'util'
import * as glob from 'glob'
import fs from 'fs/promises'
import path from 'path'

const globAsync = promisify(glob)

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

interface FileContent {
  name: string
  content: string
}

async function main() {
  const {
    in: globPattern,
    out: outputPath,
    'max-lines': maxLines,
  } = yargs(hideBin(process.argv))
    .option('in', {
      alias: 'i',
      description: 'Glob pattern for input files',
      type: 'string',
      demandOption: true,
    })
    .option('out', {
      alias: 'o',
      description: 'Output markdown file path',
      type: 'string',
      demandOption: true,
    })
    .option('max-lines', {
      description: 'Maximum lines per output file',
      type: 'number',
      default: 7000,
    })
    .help()
    .alias('help', 'h').argv as any

  if (!globPattern) {
    throw new Error('Glob pattern is required')
  }

  if (!outputPath) {
    throw new Error('Output path is required')
  }

  const fullOutputPath = path.join(process.cwd(), outputPath)

  const files = await globAsync(globPattern)

  const fileContents: FileContent[] = []

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8')

    const ext = path.extname(file)
    const language = ext.slice(1)

    const fileName = path.relative(process.cwd(), file)

    let markdown = `\n## ${fileName}\n\n`
    markdown += `\`\`\`${language}\n`
    markdown += content
    markdown += '```\n'

    fileContents.push({
      name: fileName,
      content: markdown,
    })
  }

  let outputCount = 1
  let lines = 0

  const maxLinesPerFile = maxLines || 7000

  const outputExt = path.extname(outputPath)
  const outputBase = path.basename(outputPath, outputExt)

  for (const file of fileContents) {
    if (lines + file.content.split('\n').length > maxLinesPerFile) {
      outputCount++
      lines = 0
    }

    const outputFile = path.join(
      path.dirname(outputPath),
      `${outputBase}.${outputCount}${outputExt}`
    )

    await fs.appendFile(outputFile, file.content.slice(1))

    lines += file.content.split('\n').length
  }

  console.log(`Wrote ${fileContents.length} files to ${fullOutputPath}`)
}

main()
