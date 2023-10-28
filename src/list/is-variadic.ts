import { Type, Kind } from '..'

/**
 * `_$isVariadic` is a type-level function that checks if a tuple is variadic.
 *
 * @template T - The tuple to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = List._$isVariadic<[1, 2, 3, ...number[]]> // true
 * type T1 = List._$isVariadic<[1, 2, 3]> // false
 */
export type _$isVariadic<T extends unknown[]> = number extends T['length']
  ? true
  : false

/**
 * `IsVariadic` is a type-level function that checks if a tuple is variadic.
 *
 * @template T - The tuple to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = $<List.IsVariadic, [1, 2, 3, ...number[]]> // true
 * type T1 = $<List.IsVariadic, [1, 2, 3]> // false
 */
export interface IsVariadic extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$isVariadic<typeof x>
}
