import * as fs from 'fs'
import ts from 'typescript'

/**
 * Processes a file and calls a visitor function on each node.
 *
 * @param filePath - The path to the file to process.
 * @param visitor - The visitor function to call on each node.
 *
 * @returns The result of the visitor function, or undefined if no result is
 * returned.
 */
export function processFileVisitor<T>(
  filePath: string,
  visitor: (node: ts.Node, sourceFile: ts.SourceFile) => T | undefined
): T[] {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf-8'),
    ts.ScriptTarget.Latest,
    true
  )

  const results: T[] = []

  function visit(node: ts.Node) {
    const visitorResult = visitor(node, sourceFile)
    if (visitorResult !== undefined) {
      results.push(visitorResult)
      return
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)

  return results
}
