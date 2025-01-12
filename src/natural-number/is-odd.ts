import { Type, Kind, DigitList, Number as Number_, NaturalNumber } from '..'

/**
 * `_$isOdd` is a type-level function that takes in a natural number type,
 * `A`, and returns a boolean indicating whether `A` is an odd number
 *
 * @template {Number_.Number} A - A natural number.
 * @returns {boolean}
 */
export type _$isOdd<
  T extends Number_.Number,
  LIST extends DigitList.DigitList = NaturalNumber._$toList<T>,
  RESULT = DigitList._$isOdd<LIST>
> = RESULT

/**
 * `IsOdd` is a type-level function that takes in a natural number type,
 * `A`, and returns a boolean indicating whether `A` is an odd number
 *
 * @template {Number_.Number} A - A natural number.
 * @returns {boolean}
 */
export interface IsOdd extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? _$isOdd<typeof x> : never
}

/**
 * Given a natural number, return whether or not it is an odd number.
 *
 * @param {Number_.Number} x - The natural number to check.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const T0 = NaturalNumber.isOdd(42); // false
 * const T1 = NaturalNumber.isOdd(43); // true
 * ```
 */
export const isOdd = ((x: Number_.Number) =>
  Number(x) % 2 === 1) as Kind._$reify<IsOdd>
