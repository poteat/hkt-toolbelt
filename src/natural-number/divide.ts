import { Type, Number as Number_, Kind, DigitList, NaturalNumber } from '..'

/**
 * `_$divide` is a type-level function that performs the division operation.
 * It takes in two natural numbers `A` and `B` representing the dividend and divisor respectively,
 * and returns the result of dividing `A` by `B`.
 *
 * @template {Number_.Number} A - A natural number to divide.
 * @template {Number_.Number} B - A natural number to divide by.
 * @returns {Number_.Number} A natural number type.
 *
 * If `A` is not a multiple of `B`, the quotient is returned and the remainder is thrown away.
 *
 * @example
 * For example, we can use `_$divide` to divide 10 by 2:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$divide<10, 2>; // 5
 * ```
 *
 * @example
 * If `A` is not a multiple of `B`, only the quotient is returned.
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = NaturalNumber._$divide<100, 99>; // 1
 * ```
 */
export type _$divide<
  A extends Number_.Number,
  B extends Number_.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  QUOTIENT_LIST = DigitList._$divide<A_LIST, B_LIST>,
  QUOTIENT = DigitList._$toNumber<
    QUOTIENT_LIST extends DigitList.DigitList ? QUOTIENT_LIST : never
  >
> = QUOTIENT

export interface Divide_T<A extends Number_.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? _$divide<A, typeof x> : never
}

/**
 * `Divide` is a type-level function that takes in two natural numbers and performs a division operation.
 * It returns the result of the division operation.
 *
 * @template {Number_.Number} A - A natural number to divide.
 * @template {Number_.Number} B - A natural number to divide by.
 * @returns {Number_.Number} A natural number type.
 *
 * If `A` is not a multiple of `B`, the quotient is returned and the remainder is thrown away.
 *
 * If either input is not a natural number, `never` is returned.
 *
 * @example
 * For example, we can use `Divide` to create a division operation that divides 10 by 2:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.Divide, 10>, 2>; // 5
 * ```
 *
 * @example
 * If `A` is not a multiple of `B`, only the quotient is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.Divide, 100>, 99>; // 1
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Divide, -42.42>; // never
 * ```
 */
export interface Divide extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? Divide_T<typeof x> : never
}

/**
 * Given two natural numbers, divide the first by the second, and return the
 * floored result as a natural number.
 *
 * @param {Number_.Number} A - The numerator.
 * @param {Number_.Number} B - The denominator.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const T0 = NaturalNumber.divide(42)(10); // 4
 * ```
 */
export const divide = ((a: Number_.Number) => (b: Number_.Number) =>
  Math.floor(Number(a) / Number(b))) as Kind._$reify<Divide>
