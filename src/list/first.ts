import { Type, Kind } from '..'

/**
 * `List.First` is a type-level function that returns the first element of a tuple.
 * 
 * @template T - The tuple to get the first element of.
 * 
 * @example
 * type T0 = List._$first<[1, 2, 3]> // 1
 * type T1 = List._$first<[]> // never
 */
export type _$first<T extends unknown[]> = T extends [] ? never : T[0]

/**
 * `List.First` is a type-level function that returns the first element of a tuple.
 * 
 * @template T - The tuple to get the first element of.
 * 
 * @example
 * type T0 = $<List.First, [1, 2, 3]> // 1
 * type T1 = $<List.First, []> // never
 */
export interface First extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$first<typeof x>
}
