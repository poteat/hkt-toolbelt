import { Kind, Type } from '..'

/**
 * `_$isEmpty` is a type-level function that checks if a list is empty.
 *
 * @template T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = List._$isEmpty<[]> // true
 * type T1 = List._$isEmpty<[1, 2, 3]> // false
 * ```
 */
export type _$isEmpty<T extends unknown[]> = T extends [] ? true : false

/**
 * `IsEmpty` is a type-level function that checks if a list is empty.
 *
 * @template T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.IsEmpty, []>> // true
 * type T1 = $<$<List.IsEmpty, [1, 2, 3]>> // false
 * ```
 */
export interface IsEmpty extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$isEmpty<typeof x>
}
