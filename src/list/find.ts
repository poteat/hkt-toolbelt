import { $, Type, Kind } from '..'

/**
 * `_$find` is a type-level function that finds the first element in a list that satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template X - The list to search.
 *
 * @example
 * type T0 = List._$find<$<Conditional.Equals, 3>, [1, 2, 3]> // 3
 * type T1 = List._$find<$<Conditional.Equals, 4>, [1, 2, 3]> // never
 */
export type _$find<F extends Kind.Kind, X extends unknown[]> = X extends [
  infer Head,
  ...infer Tail
]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? Head
    : _$find<F, Tail>
  : never

/**
 * `List.Find_T` is an intermediate interface for currying.
 *
 * @template F - The condition function.
 */
interface Find_T<F extends Kind.Kind<(x: never) => boolean>> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>): _$find<F, typeof x>
}

/**
 * `Find` is a type-level function that finds the first element in a list that satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template X - The list to search.
 *
 * @example
 * type T0 = $<$<List.Find, $<Conditional.Equals, 3>>, [1, 2, 3]> // 3
 * type T1 = $<$<List.Find, $<Conditional.Equals, 4>>, [1, 2, 3]> // never
 */
export interface Find extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Find_T<typeof x>
}
