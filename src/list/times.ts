import { Kind, Type, DigitList, Number, List, NaturalNumber } from '..'

type _$times2<
  COUNTER extends DigitList.DigitList,
  STATE extends List.List = [],
  DEC extends DigitList.DigitList = DigitList._$decrement<COUNTER>,
  DEC_STR extends string = DigitList._$toString<DEC>,
  DEC_NUM extends Number.Number = Number._$fromString<DEC_STR>
> = 0 extends 1
  ? never
  : COUNTER extends ['0']
    ? STATE
    : _$times2<DEC, [DEC_NUM, ...STATE]>

/**
 * `_$times` is a type-level function that generates a list of numbers from 0 to N-1.
 *
 * @template N - The length of the list to be generated.
 * @returns A list of non-negative integer types.
 */
export type _$times<N extends Number.Number> = _$times2<
  NaturalNumber._$toList<N>
>

/**
 * `Times` is a type-level function that generates a list of numbers from 0 to N-1.
 *
 * @template N - The length of the list to be generated.
 * @returns A list of non-negative integer types.
 */
export interface Times extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$times<typeof x> : never
}

/**
 * Given a number, return a list of numbers from 0 to N-1.
 *
 * @param {number} n - The length of the list to be generated.
 *
 * @example
 * ```ts
 * import { List } from "hkt-toolbelt";
 *
 * const result = List.times(3)
 * //    ^? [0, 1, 2]
 * ```
 */
export const times = ((n: number) => {
  const result = []
  for (let i = 0; i < n; i++) {
    result.push(i)
  }
  return result
}) as Kind._$reify<Times>
