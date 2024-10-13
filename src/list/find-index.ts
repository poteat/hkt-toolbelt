import { $, Kind, Type, DigitList, Function } from '..'

/**
 * `_$findIndex` is a type-level function that takes in a predicate `F` and a
 * list `T`, and returns the index of the first element in `T` that satisfies
 * the predicate. Returns `-1` if no element satisfies the predicate.
 *
 * @template {Kind.Kind<(x: never) => boolean>} F - The predicate to check.
 * @template {unknown[]} T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = List._$findIndex<$<Conditional.Equals, 3>>, [1, 2, 3]> // 2
 * ```
 */
export type _$findIndex<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  I extends DigitList.DigitList = ['0']
> = T extends [infer Head, ...infer Tail]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? DigitList._$toNumber<I>
    : _$findIndex<F, Tail, DigitList._$increment<I>>
  : -1

interface FindIndex_T<F extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$findIndex<F, typeof x>
}

/**
 * `FindIndex` is a type-level function that takes in a predicate `F` and a
 * list `T`, and returns the index of the first element in `T` that satisfies
 * the predicate. Returns `-1` if no element satisfies the predicate.
 *
 * @template {Kind.Kind<(x: never) => boolean>} F - The predicate to check.
 * @template {unknown[]} T - The list to check.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.FindIndex, $<Conditional.Equals, 3>>, [1, 2, 3]> // 2
 * ```
 */
export interface FindIndex extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): FindIndex_T<typeof x>
}

/**
 * Given a predicate and a list, return the index of the first element in the
 * list that satisfies the predicate. Returns `-1` if no element satisfies the
 * predicate.
 *
 * @param {Kind.Kind<(x: never) => boolean>} f - The predicate to check.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.findIndex(String.isString)(['foo', 'bar'])
 * //    ^? 1
 * ```
 */
export const findIndex = ((f: Function.Function) => (values: unknown[]) =>
  values.findIndex(f as never)) as Kind._$reify<FindIndex>
