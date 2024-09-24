import { Kind, List, Type } from '..'

/**
 * `_$chunk` is a type-level function that takes in a number `N`, `M`, and a
 * matrix `T`, and returns an array of matrices, where each matrix has
 * dimensions `N` x `M`, i.e. N rows and M columns.
 *
 * Trailing submatrices have shorter dimensions if the new dimensions do not
 * divide evenly into the original dimensions.
 *
 * @template N - The number of rows in each resulting submatrix.
 * @template M - The number of columns in each resulting submatrix.
 * @template T - The matrix to chunk.
 * @returns An array of matrices, where each matrix has dimensions `N` x `M`.
 *
 * @example
 * For example, we can use `_$chunk` to chunk a matrix into matrices of
 * dimensions `N` x `M`:
 *
 * ```ts
 * import { Matrix } from "hkt-toolbelt";
 *
 * type Result = Matrix._$chunk<2, 2, [[1, 2, 3, 4], [5, 6, 7, 8]]]>;
 * // [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
 * ```
 */
export type _$chunk<
  N extends number,
  M extends number,
  T extends unknown[][],
  CHUNKED_COLS extends unknown[][][][] = {
    [K1 in keyof T]: List._$chunk<M, T[K1]>
  },
  CHUNKED_ROWS extends unknown[][][][][] = List._$chunk<N, CHUNKED_COLS>,
  ZIPPED_ROWS extends unknown[][][][] = {
    [K1 in keyof CHUNKED_ROWS]: List._$zip<CHUNKED_ROWS[K1]>
  },
  FLATTENED_ROWS extends unknown[][][] = List._$flattenN<ZIPPED_ROWS, 1>
> = FLATTENED_ROWS

interface Chunk_T2<N extends number, M extends number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[][]>): _$chunk<N, M, typeof x>
}

interface Chunk_T1<N extends number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): Chunk_T2<N, typeof x>
}

/**
 * `Chunk` is a type-level function that takes in a number `N` and a matrix `T`,
 * and returns an array of matrices, where each matrix has dimensions `N` x `M`,
 * i.e. N rows and M columns.
 *
 * Trailing submatrices have shorter dimensions if the new dimensions do not
 * divide evenly into the original dimensions.
 *
 * @template N - The number of rows in each resulting submatrix.
 * @template M - The number of columns in each resulting submatrix.
 * @template T - The matrix to chunk.
 * @returns An array of matrices, where each matrix has dimensions `N` x `M`.
 *
 * @example
 * For example, we can use `Chunk` to chunk a matrix into matrices of dimensions
 * `N` x `M`:
 *
 * ```ts
 * import { $, $N, Matrix } from "hkt-toolbelt";
 *
 * type Result = $<
 *   $N<Matrix.Chunk, [2, 2]>,
 *   [[1, 2, 3, 4], [5, 6, 7, 8]]
 * >; // [[[1, 2], [3, 4]], [[5, 6], [7, 8]]]
 * ```
 */
export interface Chunk extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): Chunk_T1<typeof x>
}
