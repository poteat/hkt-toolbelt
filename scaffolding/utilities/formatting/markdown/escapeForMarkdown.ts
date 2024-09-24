/**
 * Escapes a string for use in Markdown.
 */
export function escapeForMarkdown(str: string) {
  return str.replace(/\$/g, '\\$')
}
