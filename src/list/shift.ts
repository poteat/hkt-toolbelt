import { Type, Kind } from '..'

/**
 * `_$shift` is a type-level function that shifts one element from the head of an array.
 *
 * @template T - The array to remove the head from.
 *
 * @example
 * type T0 = List._$shift<['a', 'b', 'c']> // ['b', 'c']
 * type T1 = List._$shift<['b', 'c']> // ['c']
 */
export type _$shift<T extends unknown[]> = T extends [unknown, ...infer Tail]
  ? Tail
  : never

/**
 * `Shift` is a type-level function that shifts one element from the head of an array.
 *
 * @template T - The array to remove the head from.
 *
 * @example
 * type T0 = $<List.Shift, ['a', 'b', 'c']> // ['b', 'c']
 * type T1 = $<List.Shift, ['b', 'c']> // ['c']
 */
export interface Shift extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$shift<typeof x>
}
