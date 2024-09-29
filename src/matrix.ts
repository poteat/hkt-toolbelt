export * from './matrix/'

/**
 * The `Matrix` module contains various utilities for working with matrices.
 * Matrices are represented as arrays of arrays, i.e. an array of rows.
 *
 * @example
 * ```ts
 * import { $, Matrix } from 'hkt-toolbelt'
 *
 * type Result = $<Matrix.Columns, [[1, 2, 3], [4, 5, 6]]] // [[1, 4], [2, 5], [3, 6]]
 * ```
 */
declare module './matrix' {}
