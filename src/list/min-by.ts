import { $, Kind, NaturalNumber, Type, Function } from '..'

/**
 * `_$minBy` is a type-level function that takes in a kind `F` that returns a number,
 * and a list `T`, and returns the element in `T` that has the lowest score
 * when applying `F` to each element.
 *
 * @template {Kind} F - The kind that returns a number.
 * @template {unknown[]} T - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * type T0 = _$minBy<Function.Identity, [1, 2, 3]> // 1
 * ```
 */
export type _$minBy<
  F extends Kind.Kind,
  T extends unknown[],
  MinValue = never,
  MinScore extends number = never
> = T extends [infer Head extends Kind._$inputOf<F>, ...infer Tail]
  ? $<F, Head> extends infer NewScore extends number
    ? [MinScore] extends [never]
      ? _$minBy<F, Tail, Head, NewScore>
      : NaturalNumber._$compare<NewScore, MinScore> extends -1
        ? _$minBy<F, Tail, Head, NewScore>
        : _$minBy<F, Tail, MinValue, MinScore>
    : never
  : MinValue

interface MinBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$minBy<F, typeof x>
}

/**
 * `MinBy` is a type-level function that takes in a kind `F` that returns a number,
 * and a list `T`, and returns the element in `T` that has the lowest score
 * when applying `F` to each element.
 *
 * @template {Kind} F - The kind that returns a number.
 * @template {unknown[]} T - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.MinBy, Function.Identity>, [1, 2, 3]> // 1
 * ```
 */
export interface MinBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MinBy_T<typeof x>
}

/**
 * Given a list and a value, return the element which has the smallest score
 * when applying `F` to each element.
 *
 * @param {Kind.Kind<(x: never) => boolean>} f - The scoring function.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.minBy(String.length)(['foo', 'bars', 'qu'])
 * //    ^? 'qu'
 * ```
 */
export const minBy = ((f: Function.Function) => (values: unknown[]) => {
  let minValue = undefined
  let minScore = Infinity

  for (const value of values) {
    const score = f(value as never) as number

    if (score < minScore) {
      minValue = value
      minScore = score
    }
  }

  return minValue
}) as Kind._$reify<MinBy>
