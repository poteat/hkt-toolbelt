import { Type, Number, Kind, DigitList, NaturalNumber } from '..'

/**
 * `_$divide` is a type-level function that performs the division operation.
 * It takes in two natural numbers `A` and `B` representing the dividend and divisor respectively,
 * and returns the result of dividing `A` by `B`.
 *
 * @param {Number.Number} A - A natural number to divide.
 * @param {Number.Number} B - A natural number to divide by.
 * @returns {Number.Number} A natural number type.
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
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  QUOTIENT_LIST extends DigitList.DigitList = DigitList._$divide<
    A_LIST,
    B_LIST
  >,
  QUOTIENT = DigitList._$toNumber<QUOTIENT_LIST>
> = QUOTIENT

interface Divide_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$divide<A, typeof x> : never
}

/**
 * `Divide` is a type-level function that takes in two natural numbers and performs a division operation.
 * It returns the result of the division operation.
 *
 * @param {Number.Number} A - A natural number to divide.
 * @param {Number.Number} B - A natural number to divide by.
 * @returns {Number.Number} A natural number type.
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
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Divide_T<typeof x> : never
}
