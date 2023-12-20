import { Type, Kind, Number, NaturalNumber, DigitList } from '..'

/**
 * `_$isEven` is a type-level function that takes in a natural number type,
 * `A`, and returns a boolean indicating whether `A` is an even number
 *
 * @template {Number.Number} A - A natural number.
 * @returns {boolean}
 */
export type _$isEven<
  T extends Number.Number,
  LIST extends DigitList.DigitList = NaturalNumber._$toList<T>,
  RESULT = DigitList._$isEven<LIST>
> = RESULT

/**
 * `IsEven` is a type-level function that takes in a natural number type,
 * `A`, and returns a boolean indicating whether `A` is an even number
 *
 * @template {Number.Number} A - A natural number.
 * @returns {boolean}
 */
export interface IsEven extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$isEven<typeof x> : never
}
