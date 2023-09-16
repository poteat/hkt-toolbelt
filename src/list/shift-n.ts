import { Type, Kind, Number, NaturalNumber, DigitList, Digit, List } from '..'

/**
 * `_$shiftN2` is a type-level function that shifts N elements from the head of an array.
 * 
 * @template T - The array to shift elements from.
 * @template N - The number of elements to shift.
 * 
 * @example
 * type T0 = _$shiftN2<['a', 'b', 'c'], 1> // ['b', 'c']
 * type T1 = _$shiftN2<['a', 'b', 'c'], 2> // ['c']
 */
type _$shiftN2<
  T extends unknown[],
  N extends DigitList.DigitList,
  RESULT extends List.List = T extends [unknown, ...infer Tail]
    ? N extends [Digit.Zero]
      ? T
      : _$shiftN2<Tail, DigitList._$decrement<N>>
    : []
> = RESULT

/**
 * `_$shiftN` is a type-level function that shifts N elements from the head of an array.
 * 
 * @template T - The array to shift elements from.
 * @template N - The number of elements to shift.
 * 
 * @example
 * type T0 = _$shiftN<['a', 'b', 'c'], 1> // ['b', 'c']
 * type T1 = _$shiftN<['a', 'b', 'c'], 2> // ['c']
 */
export type _$shiftN<
  T extends unknown[],
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true
    ? _$shiftN2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT

/**
 * `ShiftN_T` is an intermediate interface for currying.
 * 
 * @template N - The number of elements to shift.
 */
interface ShiftN_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$shiftN<typeof x, N>
}

/**
 * `ShiftN` is a type-level function that shifts N elements from the head of an array.
 * 
 * @template N - The number of elements to shift.
 * @template T - The array to shift elements from.
 * 
 * @example
 * type T0 = $<ShiftN, 1, ['a', 'b', 'c']> // ['b', 'c']
 * type T1 = $<ShiftN, 2, ['a', 'b', 'c']> // ['c']
 */
export interface ShiftN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): ShiftN_T<typeof x>
}
