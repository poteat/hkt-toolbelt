import { Kind, Type, Number } from '..'

/**
 * `_$take` is a type-level function that takes in a number `N` and a list `T`,
 * and returns a list of the first `N` elements of `T`.
 *
 * @template {number} N - The number of elements to take.
 * @template {unknown[]} T - The list to take elements from.
 *
 * @example
 * ```ts
 * type T0 = _$take<2, [1, 2, 3]> // [1, 2]
 * ```
 */
export type _$take<
  N extends Number.Number,
  T extends unknown[],
  O extends unknown[] = []
> = 0 extends 1
  ? never
  : O['length'] extends N
    ? O
    : T extends [infer Head, ...infer Tail]
      ? _$take<N, Tail, [...O, Head]>
      : never

interface Take_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$take<N, typeof x>
}

/**
 * `Take` is a type-level function that takes in a number `N` and a list `T`,
 * and returns a list of the first `N` elements of `T`.
 *
 * @template {number} N - The number of elements to take.
 * @template {unknown[]} T - The list to take elements from.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.Take, 2>, [1, 2, 3]> // [1, 2]
 * ```
 */
export interface Take extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Take_T<typeof x>
}

/**
 * Given a number and a list, take the first N elements of the list.
 *
 * @param {number} n - The number of elements to take.
 * @param {unknown[]} values - The list to take elements from.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.take(2)([1, 2, 3])
 * //    ^? [1, 2]
 * ```
 */
export const take = ((n: number) => (values: unknown[]) =>
  n <= values.length ? values.slice(0, n) : Type.never) as Kind._$reify<Take>
