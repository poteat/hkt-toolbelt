import { glob } from 'glob'
import { chain } from 'lodash'
import ts from 'typescript'
import { getJSDoc } from '../utilities/ast/getJSDoc'
import { isExported } from '../utilities/ast/isExported'
import { processFileVisitor } from '../utilities/ast/processFileVisitor'
import { formatJSDoc } from '../utilities/formatting/formatJSDoc'
import { generateMarkdownSlug } from '../utilities/formatting/markdown/generateMarkdownSlug'
import { pathToModuleName } from '../utilities/formatting/pathToModuleName'

/**
 * Get the utility information for all utilities in the library, including their
 * name, description, and source file.
 */
export async function getUtilitiesInfo() {
  const files = await glob.glob('src/*/!(*.spec|index).ts')

  const utilitiesInfo = chain(files)
    .map((path) => ({
      path,
      utilities: processFileVisitor(path, (node, sourceFile) => {
        if (
          (ts.isInterfaceDeclaration(node) ||
            ts.isTypeAliasDeclaration(node)) &&
          isExported(node)
        ) {
          const moduleName = pathToModuleName(path)
          const name = node.name.getText(sourceFile)
          const fullDescription = formatJSDoc(getJSDoc(node) || '')
          const shortDescription = getJSDoc(node)
            ?.split('\n\n')[0]
            ?.replace(/\n/g, ' ')
          const slug = generateMarkdownSlug(name)
          const moduleSlug = generateMarkdownSlug(moduleName)

          return {
            name,
            shortDescription,
            fullDescription,
            moduleName,
            slug,
            moduleSlug
          }
        }
      })
        .filter((x) => !x.name.startsWith('_'))
        .sort((a, b) => a.name.localeCompare(b.name))
    }))
    .groupBy((file) => pathToModuleName(file.path))
    .mapValues((files, name) => ({
      name,
      files: files.sort((a, b) => a.path.localeCompare(b.path))
    }))
    .values()
    .value()

  return utilitiesInfo
}
