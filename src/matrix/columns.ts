import { Kind, Type } from '..'

/**
 * const transpose = <T>(matrix: Matrix<T>): Matrix<T> =>
 *   matrix[0].map((_, i) => matrix.map((row) => row[i]));
 */

type _$columns3<T extends unknown[][], K2 extends string | number | symbol> = {
  [K in keyof T]: T[K][Type._$cast<K2, keyof T[K]>]
}

type _$columns2<T extends unknown[][], FirstRow extends unknown[]> = {
  [K in keyof FirstRow]: _$columns3<T, K>
}

/**
 * `_$columns` is a type-level function that takes in a matrix and returns the
 * columns of the matrix.
 *
 * Since a matrix is represented as an array of arrays, i.e. an array of columns,
 * this function implements the zip function, as well as the transpose function.
 *
 * @template T - The matrix to get the columns of.
 * @returns A tuple of the columns of the matrix.
 *
 * @example
 * For example, we can use `_$columns` to get the columns of a matrix:
 *
 * ```ts
 * import { Matrix } from "hkt-toolbelt";
 *
 * type Result = Matrix._$columns<[[1, 2, 3], [4, 5, 6]]>; // [[1, 4], [2, 5], [3, 6]]
 * ```
 */
export type _$columns<T extends unknown[][]> = _$columns2<T, T[0]>

/**
 * `Columns` is a type-level function that takes in a matrix and returns the
 * columns of the matrix.
 *
 * Since a matrix is represented as an array of arrays, i.e. an array of columns,
 * this function implements the zip function.
 *
 * @template T - The matrix to get the columns of.
 * @returns A tuple of the columns of the matrix.
 *
 * @example
 * For example, we can use `Columns` to get the columns of a matrix:
 *
 * ```ts
 * import { $, Matrix } from "hkt-toolbelt";
 *
 * type Result = $<Matrix.Columns, [[1, 2, 3], [4, 5, 6]]>; // [[1, 4], [2, 5], [3, 6]]
 * ```
 */
export interface Columns extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[][]>): _$columns<typeof x>
}
