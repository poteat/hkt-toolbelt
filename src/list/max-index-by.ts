import { $, Kind, Type, DigitList, NaturalNumber, Function } from '..'

type _$maxIndexBy2<
  F extends Kind.Kind,
  T extends unknown[],
  I extends DigitList.DigitList = ['0'],
  MaxIndex extends DigitList.DigitList = never,
  MaxScore extends number = never
> = T extends [infer Head extends Kind._$inputOf<F>, ...infer Tail]
  ? $<F, Head> extends infer NewScore extends number
    ? [MaxScore] extends [never]
      ? _$maxIndexBy2<F, Tail, DigitList._$increment<I>, I, NewScore>
      : NaturalNumber._$compare<NewScore, MaxScore> extends 1
        ? _$maxIndexBy2<F, Tail, DigitList._$increment<I>, I, NewScore>
        : _$maxIndexBy2<F, Tail, DigitList._$increment<I>, MaxIndex, MaxScore>
    : never
  : DigitList._$toNumber<MaxIndex>

/**
 * `_$maxIndexBy` is a type-level function that takes in a kind `F` that returns
 * a number, and a list `T`, and returns the index of the maximum element in `T`
 * according to the scoring function `F`.
 *
 * Returns -1 if the list is empty.
 *
 * @template {Kind.Kind<(x: never) => number>} F - The scoring function.
 * @template {unknown[]} T - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * type T0 = List._$maxIndexBy<Function.Identity, [1, 2, 3]> // 2
 * ```
 */
export type _$maxIndexBy<
  F extends Kind.Kind,
  T extends unknown[]
> = T extends [] ? -1 : _$maxIndexBy2<F, T>

interface MaxIndexBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$maxIndexBy<F, typeof x>
}

/**
 * `MaxBy` is a type-level function that takes in a kind `F` that returns a
 * number, and a list `T`, and returns the index of the maximum element in `T`
 * according to the scoring function `F`.
 *
 * Returns -1 if the list is empty.
 *
 * @template {Kind.Kind<(x: never) => number>} F - The scoring function.
 * @template {unknown[]} T - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.MaxBy, Function.Identity>, [1, 2, 3]> // 2
 * ```
 */
export interface MaxIndexBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MaxIndexBy_T<typeof x>
}

/**
 * Given a scoring function and a list, return the index of the maximum element
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
 * const result = List.maxIndexBy(String.length)(['foo', 'bars', 'qux'])
 * //    ^? 1
 * ```
 */
export const maxIndexBy = (f: Function.Function) => (values: unknown[]) => {
  let maxIndex = -1
  let maxScore = -Infinity

  for (let i = 0; i < values.length; i++) {
    const score = f(values[i] as never) as number

    if (score > maxScore) {
      maxIndex = i
      maxScore = score
    }
  }

  return maxIndex
}
