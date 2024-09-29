import { Kind, Type } from '..'

/**
 * `_$length` is a type-level function that returns the length of a list.
 *
 * @template T - The list to get the length of.
 * @returns A non-negative integer type.
 *
 * @example
 * type T0 = List._$length<[1, 2, 3]> // 3
 * type T1 = List._$length<[]> // 0
 */
export type _$length<T extends unknown[]> = T['length']

/**
 * `Length` is a type-level function that returns the length of a list.
 *
 * @template T - The list to get the length of.
 * @returns A non-negative integer type.
 *
 * @example
 * type T0 = $<List.Length, [1, 2, 3]> // 3
 * type T1 = $<List.Length, []> // 0
 */
export interface Length extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$length<typeof x>
}

/**
 * Returns the length of the given list.
 *
 * @example
 * ```ts
 * import { $, List } from "hkt-toolbelt";
 *
 * const result = List.length([1, 2, 3]) // 3
 * ```
 */
export const length = ((x: unknown[]) => x.length) as Kind._$reify<Length>
