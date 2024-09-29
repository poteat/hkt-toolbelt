import ts from 'typescript'

/**
 * Utility function to check if a node is exported.
 */
export function isExported(node: ts.Node): boolean {
  return (
    (ts.getCombinedModifierFlags(node as ts.Declaration) &
      ts.ModifierFlags.Export) !==
    0
  )
}
