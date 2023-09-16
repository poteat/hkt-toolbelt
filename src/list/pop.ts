import { Type, Kind } from '..'

/**
 * `_$pop` is a type-level function that pops one element from the tail of a list.
 *
 * @template T - The list to pop the tail element from.
 * @returns A list of types.
 *
 * @example
 * type T0 = List._$pop<['a', 'b', 'c']> // ['a', 'b']
 */
export type _$pop<T extends readonly unknown[]> = T extends [
  ...infer Head,
  unknown
]
  ? Head
  : never

/**
 * `Pop` is a type-level function that pops one element from the tail of a list.
 *
 * @template T - The list to pop the tail element from.
 * @returns A list of types.
 *
 * @example
 * type T0 = $<List.Pop, ['a', 'b', 'c']> // ['a', 'b']
 */
export interface Pop extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], readonly unknown[]>): _$pop<typeof x>
}
