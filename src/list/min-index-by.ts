import { $, Kind, Type, DigitList, NaturalNumber, Function } from '..'

type _$minIndexBy2<
  F extends Kind.Kind,
  T extends unknown[],
  I extends DigitList.DigitList = ['0'],
  MinIndex extends DigitList.DigitList = never,
  MinScore extends number = never
> = T extends [infer Head extends Kind._$inputOf<F>, ...infer Tail]
  ? $<F, Head> extends infer NewScore extends number
    ? [MinScore] extends [never]
      ? _$minIndexBy2<F, Tail, DigitList._$increment<I>, I, NewScore>
      : NaturalNumber._$compare<NewScore, MinScore> extends -1
        ? _$minIndexBy2<F, Tail, DigitList._$increment<I>, I, NewScore>
        : _$minIndexBy2<F, Tail, DigitList._$increment<I>, MinIndex, MinScore>
    : never
  : DigitList._$toNumber<MinIndex>

/**
 * `_$minIndexBy` is a type-level function that takes in a kind `F` that returns
 * a number, and a list `T`, and returns the index of the minimum element in `T`
 * according to the scoring function `F`.
 *
 * Returns -1 if the list is empty.
 *
 * @template {Kind.Kind<(x: never) => number>} F - The scoring function.
 * @template {unknown[]} T - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * type T0 = List._$minIndexBy<Function.Identity, [1, 2, 3]> // 0
 * ```
 */
export type _$minIndexBy<
  F extends Kind.Kind,
  T extends unknown[]
> = T extends [] ? -1 : _$minIndexBy2<F, T>

interface MinIndexBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$minIndexBy<F, typeof x>
}

/**
 * `MinBy` is a type-level function that takes in a kind `F` that returns a
 * number, and a list `T`, and returns the index of the minimum element in `T`
 * according to the scoring function `F`.
 *
 * Returns -1 if the list is empty.
 *
 * @template {Kind.Kind<(x: never) => number>} F - The scoring function.
 * @template {unknown[]} T - The list to find the minimum element of.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.MinBy, Function.Identity>, [1, 2, 3]> // 0
 * ```
 */
export interface MinIndexBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MinIndexBy_T<typeof x>
}

/**
 * Given a scoring function and a list, return the index of the minimum element
 * in the list according to the scoring function.
 *
 * Returns -1 if the list is empty.
 *
 * @param {Kind.Kind<(x: never) => number>} f - The scoring function.
 * @param {unknown[]} values - The list to check.
 *
 * @example
 * ```ts
 * import { List, String } from "hkt-toolbelt";
 *
 * const result = List.minIndexBy(String.length)(['foo', 'bars', 'qux'])
 * //    ^? 0
 * ```
 */
export const minIndexBy = (f: Function.Function) => (values: unknown[]) => {
  let minIndex = -1
  let minScore = Infinity

  for (let i = 0; i < values.length; i++) {
    const score = f(values[i] as never) as number

    if (score < minScore) {
      minIndex = i
      minScore = score
    }
  }

  return minIndex
}
