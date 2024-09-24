import ts from 'typescript'

/**
 * Extracts the JSDoc comments and tags from a given node, as a unified string,
 * excluding the leading '*' for each line.
 *
 * @param node - The node to extract the JSDoc comments and tags from.
 *
 * @returns The JSDoc comments and tags as a string, or undefined if no JSDoc
 * comments or tags are found.
 */
export function getJSDoc(node: ts.Node) {
  const jsDocHeader = ts
    .getJSDocCommentsAndTags(node)
    .map((c) => ts.getTextOfJSDocComment(c.comment))
    .join('\n')

  const jsDocTags = ts
    .getJSDocTags(node)
    .map((t) =>
      t
        .getText()
        .split('\n')
        .map((l) => l.replace(/^ \* ?/, ''))
        .join('\n')
    )
    .join('')

  const jsDocValue =
    jsDocHeader.length > 0 || jsDocTags.length > 0
      ? [jsDocHeader, jsDocTags].join('\n\n')
      : undefined

  return jsDocValue
}
