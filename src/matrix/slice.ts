import { Kind, List, Type } from '..'

/**
 * `_$slice` is a type-level function that takes in four slice coordinates and
 * a matrix, and returns the slice of the matrix. Coordinates are zero-based.
 *
 * The slice is inclusive of the start, and exclusive of the end coordinate.
 *
 * @template ROW_START - The starting row of the slice.
 * @template ROW_END - The ending row of the slice.
 * @template COL_START - The starting column of the slice.
 * @template COL_END - The ending column of the slice.
 * @template T - The matrix to get the slice of.
 * @returns A tuple of the slice of the matrix.
 *
 * @example
 * For example, we can use `_$slice` to get a slice of a matrix:
 *
 * ```ts
 * import { Matrix } from "hkt-toolbelt";
 *
 * type Result = Matrix._$slice<1, 2, 1, 2, [[1, 2, 3], [4, 5, 6]]]; // [[2, 3], [5, 6]]
 * ```
 */
export type _$slice<
  ROW_START extends number,
  ROW_END extends number,
  COL_START extends number,
  COL_END extends number,
  T extends unknown[][],
  SLICED_ROWS extends unknown[][] = List._$slice<T, ROW_START, ROW_END>,
  SLICED_COLS extends unknown[][] = {
    [K in keyof SLICED_ROWS]: List._$slice<SLICED_ROWS[K], COL_START, COL_END>
  }
> = SLICED_COLS

interface Slice_T4<
  ROW_START extends number,
  ROW_END extends number,
  COL_START extends number,
  COL_END extends number
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], unknown[][]>
  ): _$slice<ROW_START, ROW_END, COL_START, COL_END, typeof x>
}

interface Slice_T3<
  ROW_START extends number,
  ROW_END extends number,
  COL_START extends number
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], number>
  ): Slice_T4<ROW_START, ROW_END, COL_START, typeof x>
}

interface Slice_T2<ROW_START extends number, ROW_END extends number>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], number>
  ): Slice_T3<ROW_START, ROW_END, typeof x>
}

interface Slice_T1<ROW_START extends number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): Slice_T2<ROW_START, typeof x>
}

/**
 * `Slice` is a type-level function that takes in four slice coordinates and
 * a matrix, and returns the slice of the matrix. Coordinates are zero-based.
 *
 * @template ROW_START - The starting row of the slice.
 * @template ROW_END - The ending row of the slice.
 * @template COL_START - The starting column of the slice.
 * @template COL_END - The ending column of the slice.
 * @template T - The matrix to get the slice of.
 * @returns A tuple of the slice of the matrix.
 *
 * @example
 * For example, we can use `Slice` to get a slice of a matrix:
 *
 * ```ts
 * import { $, $N, Matrix } from "hkt-toolbelt";
 *
 * type Result = $<
 *   $N<Matrix.Slice, [1, 2, 1, 2]>,
 *   [[1, 2, 3], [4, 5, 6]]
 * >; // [[2, 3], [5, 6]]
 * ```
 */
export interface Slice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], number>): Slice_T1<typeof x>
}
