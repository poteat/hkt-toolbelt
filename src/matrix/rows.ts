import { Kind, Type } from '..'

/**
 * `_$rows` is a type-level function that takes in a matrix and returns the rows
 * of the matrix.
 *
 * Since a matrix is represented as an array of arrays, i.e. an array of rows,
 * this function implements the identity function.
 *
 * @template T - The matrix to get the rows of.
 * @returns A tuple of the rows of the matrix.
 *
 * @example
 * For example, we can use `_$rows` to get the rows of a matrix:
 *
 * ```ts
 * import { Matrix } from "hkt-toolbelt";
 *
 * type Result = Matrix._$rows<[[1, 2, 3], [4, 5, 6]]>; // [[1, 2, 3], [4, 5, 6]]
 * ```
 */
export type _$rows<T extends unknown[][]> = T

/**
 * `Rows` is a type-level function that takes in a matrix and returns the rows
 * of the matrix.
 *
 * Since a matrix is represented as an array of arrays, i.e. an array of rows,
 * this function implements the identity function.
 *
 * @template T - The matrix to get the rows of.
 * @returns A tuple of the rows of the matrix.
 *
 * @example
 * For example, we can use `Rows` to get the rows of a matrix:
 *
 * ```ts
 * import { $, Matrix } from "hkt-toolbelt";
 *
 * type Result = $<Matrix.Rows, [[1, 2, 3], [4, 5, 6]]>; // [[1, 2, 3], [4, 5, 6]]
 * ```
 */
export interface Rows extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[][]>): _$rows<typeof x>
}
