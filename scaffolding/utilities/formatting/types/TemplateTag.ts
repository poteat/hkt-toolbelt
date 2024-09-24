/**
 * Structure representing a template tag in a JSDoc comment. Keys are used for
 * rendering as a Markdown table.
 */
export type TemplateTag = {
  /**
   * The name of the type argument.
   */
  'Argument name': string
  /**
   * The type of the type argument, i.e. what it extends, or a constraint.
   */
  Type: string
  /**
   * The description of the type argument.
   */
  Description: string
}
