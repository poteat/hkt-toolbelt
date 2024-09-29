/**
 * Generate a slug for a given string value. This is used to generate Markdown
 * internal links.
 */

export function generateMarkdownSlug(value: string) {
  return value
    .toLowerCase()
    .replace(/\s/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
