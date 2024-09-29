import { Type, Kind } from '..'

/**
 * `_$first` is a type-level function that returns the first element of a tuple.
 *
 * @template T - The tuple to get the first element of.
 * @returns An element of `T`.
 *
 * @example
 * type T0 = List._$first<[1, 2, 3]> // 1
 * type T1 = List._$first<[]> // never
 */
export type _$first<T extends unknown[]> = T extends [] ? never : T[0]

/**
 * `First` is a type-level function that returns the first element of a tuple.
 *
 * @template T - The tuple to get the first element of.
 * @returns An element of `T`.
 *
 * @example
 * type T0 = $<List.First, [1, 2, 3]> // 1
 * type T1 = $<List.First, []> // never
 */
export interface First extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$first<typeof x>
}

/**
 * Returns the first element of a list.
 *
 * @param {unknown[]} x - The list to get the first element of.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.first([1, 2, 3])
 * //    ^? 1
 * ```
 */
export const first = ((x: unknown[]) => x[0]) as Kind._$reify<First>
