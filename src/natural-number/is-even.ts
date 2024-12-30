import { Type, Kind, Number as Number_, NaturalNumber, DigitList } from '..'

/**
 * `_$isEven` is a type-level function that takes in a natural number type,
 * `A`, and returns a boolean indicating whether `A` is an even number
 *
 * @template {Number_.Number} A - A natural number.
 * @returns {boolean}
 */
export type _$isEven<
  T extends Number_.Number,
  LIST extends DigitList.DigitList = NaturalNumber._$toList<T>,
  RESULT = DigitList._$isEven<LIST>
> = RESULT

/**
 * `IsEven` is a type-level function that takes in a natural number type,
 * `A`, and returns a boolean indicating whether `A` is an even number
 *
 * @template {Number_.Number} A - A natural number.
 * @returns {boolean}
 */
export interface IsEven extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? _$isEven<typeof x> : never
}

/**
 * Given a natural number, return whether or not it is an even number.
 *
 * @param {Number_.Number} x - The natural number to check.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const T0 = NaturalNumber.isEven(42); // true
 * ```
 */
export const isEven = ((x: Number_.Number) =>
  Number(x) % 2 === 0) as Kind._$reify<IsEven>
