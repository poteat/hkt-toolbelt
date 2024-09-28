import { $, Kind, NaturalNumber, Type } from '..'

/**
 * `_$maxBy` is a type-level function that takes in a kind `F` that returns a number,
 * and a list `T`, and returns the element in `T` that has the highest score
 * when applying `F` to each element.
 *
 * @template {Kind} F - The kind that returns a number.
 * @template {unknown[]} T - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * type T0 = _$maxBy<Function.Identity, [1, 2, 3]> // 3
 * ```
 */
export type _$maxBy<
  F extends Kind.Kind,
  T extends unknown[],
  MaxValue = never,
  MaxScore extends number = never
> = T extends [infer Head extends Kind._$inputOf<F>, ...infer Tail]
  ? $<F, Head> extends infer NewScore extends number
    ? [MaxScore] extends [never]
      ? _$maxBy<F, Tail, Head, NewScore>
      : NaturalNumber._$compare<NewScore, MaxScore> extends 1
        ? _$maxBy<F, Tail, Head, NewScore>
        : _$maxBy<F, Tail, MaxValue, MaxScore>
    : never
  : MaxValue

interface MaxBy_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$maxBy<F, typeof x>
}

/**
 * `MaxBy` is a type-level function that takes in a kind `F` that returns a number,
 * and a list `T`, and returns the element in `T` that has the highest score
 * when applying `F` to each element.
 *
 * @template {Kind} F - The kind that returns a number.
 * @template {unknown[]} T - The list to find the maximum element of.
 *
 * @example
 * ```ts
 * type T0 = $<$<List.MaxBy, Function.Identity>, [1, 2, 3]> // 3
 * ```
 */
export interface MaxBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): MaxBy_T<typeof x>
}
