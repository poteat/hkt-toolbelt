import { Conditional, Kind, Type } from '..'

/**
 * `_$includes` is a type-level function that checks if a list includes a
 * certain element.
 *
 * @template V - The value to check for.
 * @template X - The list to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = List._$includes<$<Conditional.Equals, 3>, [1, 2, 3]> // true
 * type T1 = List._$includes<$<Conditional.Equals, 4>, [1, 2, 3]> // false
 */
export type _$includes<V, X extends unknown[]> = 0 extends 1
  ? never
  : X extends [infer Head, ...infer Tail]
    ? Conditional._$equals<Head, V> extends true
      ? true
      : _$includes<V, Tail>
    : false

interface Includes_T<V> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$includes<V, typeof x>
}

/**
 * `Includes` is a type-level function that checks if a list includes a certain
 * element.
 *
 * @template V - The value to check for.
 * @template X - The list to check.
 * @returns A boolean.
 *
 * @example
 * type T0 = $<$<List.Includes, $<Conditional.Equals, 3>>, [1, 2, 3]> // true
 * type T1 = $<$<List.Includes, $<Conditional.Equals, 4>>, [1, 2, 3]> // false
 */
export interface Includes extends Kind.Kind {
  f(x: this[Kind._]): Includes_T<typeof x>
}
