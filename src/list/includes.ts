import { $, Type, Kind } from '..'

/**
 * `_$includes` is a type-level function that checks if a list includes a certain element.
 *
 * @template F - The function to apply to each element.
 * @template X - The list to check.
 *
 * @example
 * type T0 = List._$includes<$<Conditional.Equals, 3>, [1, 2, 3]> // true
 * type T1 = List._$includes<$<Conditional.Equals, 4>, [1, 2, 3]> // false
 */
export type _$includes<F extends Kind.Kind, X extends unknown[]> = X extends [
  infer Head,
  ...infer Tail
]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? true
    : _$includes<F, Tail>
  : false

interface Includes_T<T extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<T>[]>): _$includes<T, typeof x>
}

/**
 * `Includes` is a type-level function that checks if a list includes a certain element.
 *
 * @template T - The function to apply to each element.
 * @template X - The list to check.
 *
 * @example
 * type T0 = $<$<List.Includes, $<Conditional.Equals, 3>>, [1, 2, 3]> // true
 * type T1 = $<$<List.Includes, $<Conditional.Equals, 4>>, [1, 2, 3]> // false
 */
export interface Includes extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Includes_T<typeof x>
}
