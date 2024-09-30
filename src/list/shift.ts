import { Type, Kind } from '..'

/**
 * `_$shift` is a type-level function that shifts one element from the head of a list.
 *
 * @template T - The list to remove the head from.
 * @returns A list of types.
 *
 * @example
 * type T0 = List._$shift<['a', 'b', 'c']> // ['b', 'c']
 * type T1 = List._$shift<['b', 'c']> // ['c']
 */
export type _$shift<T extends unknown[]> = T extends [unknown, ...infer Tail]
  ? Tail
  : never

/**
 * `Shift` is a type-level function that shifts one element from the head of a list.
 *
 * @template T - The list to remove the head from.
 * @returns A list of types.
 *
 * @example
 * type T0 = $<List.Shift, ['a', 'b', 'c']> // ['b', 'c']
 * type T1 = $<List.Shift, ['b', 'c']> // ['c']
 */
export interface Shift extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$shift<typeof x>
}

/**
 * Given a list, remove the first element from the list.
 *
 * @param {unknown[]} x - The list to remove the head from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.shift(['a', 'b', 'c'])
 * //    ^? ['b', 'c']
 * ```
 */
export const shift = ((x: unknown[]) => x.slice(1)) as Kind._$reify<Shift>
