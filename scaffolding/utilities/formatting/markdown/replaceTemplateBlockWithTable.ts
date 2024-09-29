import { parseTemplateTags } from '../../parsing/parseTemplateTags'
import { renderMarkdownTable } from './renderMarkdownTable'

/**
 * Replaces a block of `@template` tags with a Markdown table.
 */
export function replaceTemplateBlockWithTable(content: string): string {
  const templateArguments = parseTemplateTags(content)

  if (templateArguments.length === 0) {
    return content
  }

  const markdownTable = renderMarkdownTable(templateArguments)

  return content.replace(/@template[^]*?\n\n/, markdownTable)
}
