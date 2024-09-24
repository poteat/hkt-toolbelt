import { glob } from 'glob'
import ts from 'typescript'
import { getJSDoc } from '../utilities/ast/getJSDoc'
import { processFileVisitor } from '../utilities/ast/processFileVisitor'
import { formatJSDoc } from '../utilities/formatting/formatJSDoc'
import { generateMarkdownSlug } from '../utilities/formatting/markdown/generateMarkdownSlug'
import { pascalCase } from '../utilities/string/pascalCase'

/**
 * Get the module information for all modules in the library, including their
 * name and description.
 */
export async function getModuleInfo() {
  const files = await glob.glob('src/!(*.spec|index).ts')

  const moduleInfo = files
    .flatMap((filePath) =>
      processFileVisitor(filePath, (node, sourceFile) => {
        if (ts.isModuleDeclaration(node)) {
          const name = pascalCase(node.name.getText(sourceFile)) || '$'
          const fullDescription = formatJSDoc(getJSDoc(node) || '')
          const shortDescription = getJSDoc(node)
            ?.split('\n\n')[0]
            ?.replace(/\n/g, ' ')
          const slug = generateMarkdownSlug(name)
          return { name, shortDescription, fullDescription, slug }
        }
      })
    )
    .sort((a, b) => a.name.localeCompare(b.name))

  return moduleInfo
}
