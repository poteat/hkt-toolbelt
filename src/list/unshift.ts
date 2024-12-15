import { Type, Kind } from '..'

/**
 * `_$unshift` is a type-level function that prepends an item to a list.
 *
 * @template X - The item to prepend.
 * @template T - The list to prepend to.
 * @returns A list of types.
 *
 * @example
 * type T0 = List._$unshift<1, [2, 3, 4]> // [1, 2, 3, 4]
 */
export type _$unshift<X, T extends unknown[]> = [X, ...T]

export interface Unshift_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unshift<X, typeof x>
}

/**
 * `List.Unshift` is a type-level function that prepends an item to a list.
 *
 * @template X - The item to prepend.
 * @template T - The list to prepend to.
 * @returns A list of types.
 *
 * @example
 * type T0 = $<$<List.Unshift, 1>, [2, 3, 4]> // [1, 2, 3, 4]
 */
export interface Unshift extends Kind.Kind {
  f(x: this[Kind._]): Unshift_T<typeof x>
}

/**
 * Given a value and a list, prepend the value to the start of the list.
 *
 * @param {unknown} x - The value to prepend.
 * @param {unknown[]} values - The list to prepend to.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.unshift(1)([2, 3, 4])
 * //    ^? [1, 2, 3, 4]
 * ```
 */
export const unshift = ((x: unknown) => (values: unknown[]) => [
  x,
  ...values
]) as Kind._$reify<Unshift>
