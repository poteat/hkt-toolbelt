import { TemplateTag } from '../formatting/types/TemplateTag'

/**
 * Parses the template tags from a JSDoc comment.
 */
export function parseTemplateTags(content: string): TemplateTag[] {
  const templateRegex =
    /@template(?:\s+\{([^\}]+)\})?\s+([A-Za-z_][A-Za-z0-9_]*)\s+-\s+([^\n]+)\n?/g

  const templateArguments: TemplateTag[] = []

  let match: string[] | null
  while ((match = templateRegex.exec(content)) !== null) {
    const [, argType, argName, argDescription] = match

    const wrapGrave = (str: string) => (str ? `\`${str}\`` : '')

    templateArguments.push({
      'Argument name': argName.trim(),
      Type: wrapGrave(argType ? argType.trim() : ''),
      Description: argDescription.trim()
    })
  }

  return templateArguments
}
