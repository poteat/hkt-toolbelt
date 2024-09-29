/**
 * Renders a Markdown table from an array of objects.
 */

export function renderMarkdownTable<T extends Record<string, string>>(
  data: T[]
): string {
  if (data.length === 0) return ''

  const headers = Object.keys(data[0]) as (keyof T)[]

  const headerRow = `| ${headers.join(' | ')} |`
  const separatorRow = `| ${headers.map(() => '--').join(' | ')} |`

  const rows = data.map(
    (row) => `| ${headers.map((header) => row[header] || '').join(' | ')} |`
  )

  return [headerRow, separatorRow, ...rows].join('\n') + '\n\n'
}
