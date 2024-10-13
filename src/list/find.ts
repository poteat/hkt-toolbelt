import { $, Type, Kind, Function } from '..'

/**
 * `_$find` is a type-level function that finds the first element in a list that satisfies a predicate.
 *
 * @template F - The predicate function.
 * @template X - The list to search.
 * @returns An element of `X`.
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
 * @returns An element of `X`.
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

/**
 * Given a predicate and a list, return the first element in the list that
 * satisfies the predicate.
 *
 * @param {Kind.Kind<(x: never) => boolean>} f - The predicate to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.find(String.isString)(['foo', 'bar'])
 * //    ^? foo
 * ```
 */
export const find = ((f: Function.Function) => (values: unknown[]) =>
  values.find((value) => f(value as never))) as Kind._$reify<Find>
