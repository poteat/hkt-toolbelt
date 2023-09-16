import { Type, Kind, Number, NaturalNumber, DigitList, List, Digit } from '..'

/**
 * `List._$popN2` is a type-level function that pops N elements from a list.
 * 
 * @template T - The list to pop elements from.
 * @template N - The number of elements to pop.
 * @template RESULT - The resulting list after popping N elements.
 * 
 * @example
 * type T0 = List._$popN2<['a', 'b', 'c'], [1]> // ['a', 'b']
 */
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
 * `List._$popN` is a type-level function that pops N elements from a list.
 * 
 * @template T - The list to pop elements from.
 * @template N - The number of elements to pop.
 * @template RESULT - The resulting list after popping N elements.
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

/**
 * `List.PopN_T` is an intermediate interface for currying.
 * 
 * @template N - The number of elements to pop.
 */
interface PopN_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$popN<typeof x, N>
}

/**
 * `List.PopN` is a type-level function that pops N elements from a list.
 * 
 * @template N - The number of elements to pop.
 * 
 * @example
 * type T0 = $<$<List.PopN, 1>, ['a', 'b', 'c']> // ['a', 'b']
 */
export interface PopN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): PopN_T<typeof x>
}
