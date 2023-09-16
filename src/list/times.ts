import { Kind, Type, DigitList, Number, List, NaturalNumber } from '..'

/**
 * `_$times2` is a type-level function that generates a list of numbers from 0 to N-1.
 * 
 * @template COUNTER - The counter for the recursion.
 * @template STATE - The current state of the list.
 * @template DEC - The decremented counter.
 * @template DEC_STR - The string representation of the decremented counter.
 * @template DEC_NUM - The number representation of the decremented counter.
 */
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
 * @template N - The number to generate the list to.
 */
export type _$times<N extends Number.Number> = _$times2<
  NaturalNumber._$toList<N>
>

/**
 * `Times` is a type-level function that generates a list of numbers from 0 to N-1.
 * 
 * @template x - The number to generate the list to.
 */
export interface Times extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$times<typeof x> : never
}
