import { Type, Kind, DigitList, Number, NaturalNumber } from '..'

/**
 * `_$isOdd` is a type-level function that takes in an integer type,
 * `A`, and returns a boolean indicating whether `A` is an odd number
 *
 * @param {Number.Number} A - An integer type.
 * @returns {boolean}
 */
export type _$isOdd<
  T extends Number.Number,
  LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<T>
  >,
  RESULT = DigitList._$isOdd<LIST>
> = RESULT

/**
 * `IsOdd` is a type-level function that takes in an integer type,
 * `A`, and returns a boolean indicating whether `A` is an odd number
 *
 * @param {Number.Number} A - An integer type.
 * @returns {boolean}
 */
export interface IsOdd extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$isOdd<typeof x> : never
}
