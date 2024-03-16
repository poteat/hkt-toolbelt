import { Type, Kind, Number, NaturalNumber, DigitList, List, Digit } from '..'

type _$popN2<
  T extends unknown[],
  N extends DigitList.DigitList,
  RESULT extends List.List = T extends [...infer Head, unknown]
    ? N extends [Digit.Zero]
      ? T
      : _$popN2<Head, DigitList._$decrement<N>>
    : []
> = RESULT

/**
 * `_$popN` is a type-level function that pops N elements from the tail of a list.
 *
 * @template T - The list to pop elements from.
 * @template N - The number of elements to pop.
 * @returns A list of types.
 *
 * @example
 * type T0 = List._$popN<['a', 'b', 'c'], 1> // ['a', 'b']
 */
export type _$popN<
  T extends unknown[],
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true
    ? _$popN2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT

interface PopN_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$popN<typeof x, N>
}

/**
 * `PopN` is a type-level function that pops N elements from the tail of a list.
 *
 * @template N - The number of elements to pop.
 * @template T - The list to pop elements from.
 * @returns A list of types.
 *
 * @example
 * type T0 = $<$<List.PopN, 1>, ['a', 'b', 'c']> // ['a', 'b']
 */
export interface PopN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): PopN_T<typeof x>
}
