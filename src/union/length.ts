import { Kind, Union, Type } from '..'

/**
 * `Union._$length` is a type-level function that returns the length of a union.
 * Notably, for 'boolean', the length is 2 due to it being `true | false`.
 *
 * @template T - The union to get the length of.
 *
 * @example
 * type T0 = Union._$length<1 | 2 | 3> // 3
 * type T1 = Union._$length<never> // 0
 * type T2 = Union._$length<boolean> // 2
 */
export type _$length<T> =
  Type._$isNever<T> extends true
    ? 0
    : Union._$toList<T> extends infer X extends unknown[]
      ? X['length']
      : never

/**
 * `Union.Length` is a type-level function that returns the length of a union.
 * Notably, for 'boolean', the length is 2 due to it being `true | false`.
 *
 * @template T - The union to get the length of.
 *
 * @example
 * type T0 = $<Union.Length, 1 | 2 | 3> // 3
 * type T1 = $<Union.Length, never> // 0
 * type T2 = $<Union.Length, boolean> // 2
 */
export interface Length extends Kind.Kind {
  f(x: this[Kind._]): _$length<typeof x>
}
