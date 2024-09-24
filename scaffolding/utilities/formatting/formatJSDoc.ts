import { replaceTemplateBlockWithTable } from './markdown/replaceTemplateBlockWithTable'

/**
 * Formats a JSDoc comment by removing the `@example` tag and replacing the
 * `@template` tags with a Markdown table.
 */
export function formatJSDoc(content: string): string {
  return replaceTemplateBlockWithTable(content.replace(/@example/g, ''))
}
