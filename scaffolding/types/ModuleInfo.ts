/**
 * Information about a module in the library, used for generating documentation.
 */
export type ModuleInfo = {
  /**
   * Name of the module, e.g. `List`.
   */
  name: string

  /**
   * Short description of the module, formed via the first paragraph of the
   * JSDoc comment.
   */
  shortDescription?: string

  /**
   * Full description of the module, formed via the full JSDoc comment.
   */
  fullDescription?: string

  /**
   * Slug associated with the module, for Markdown links.
   */
  slug: string

  /**
   * Source files which comprise the module.
   */
  files: {
    /**
     * Path of the utility file, e.g. 'src/list/append.ts'.
     */
    path: string

    utilities: {
      /**
       * Name of the utility, e.g. `Append`, `_$append`, etc.
       */
      name: string

      /**
       * Description of the utility, formed via the first paragraph of the
       * corresponding JSDoc comment.
       */
      shortDescription?: string

      /**
       * Full description of the utility, formed via the full JSDoc comment.
       */
      fullDescription?: string

      /**
       * Name of the module to which the utility belongs, e.g. `List`.
       */
      moduleName: string

      /**
       * Slug associated with the utility, for Markdown links.
       */
      slug: string

      /**
       * Slug associated with the module to which the utility belongs, for
       * Markdown links.
       */
      moduleSlug: string
    }[]
  }[]
}
