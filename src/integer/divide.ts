import { Type, Number, Kind, DigitList, NaturalNumber, Boolean } from '..'

/**
 * `_$divide` is a type-level function that performs the division operation.
 * It takes in two integers `A` and `B` representing the dividend and divisor respectively,
 * and returns the result of dividing `A` by `B`.
 *
 * @template {Number.Number} A - An integer to divide.
 * @template {Number.Number} B - An integer to divide by.
 * @returns {Number.Number} An integer type.
 *
 * If `A` is not a multiple of `B`, the quotient is returned and the remainder is thrown away.
 * The quotient is truncated towards zero. That is, `-1/2` is evaluated to be 0, not -1.
 *
 * @example
 * For example, we can use `_$divide` to divide 10 by 2:
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$divide<10, 2>; // 5
 * ```
 *
 * @example
 * If `A` is not a multiple of `B`, the result is truncated towards zero,
 * and only the quotient is returned.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result = Integer._$divide<-100, 99>; // -1
 * ```
 */
export type _$divide<
  A extends Number.Number,
  B extends Number.Number,
  A_SGN extends '+' | '-' = Number._$sign<A>,
  B_SGN extends '+' | '-' = Number._$sign<B>,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<A>
  >,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<B>
  >,
  QUOTIENT_LIST = DigitList._$divide<
    A_LIST,
    B_LIST
  >,
  QUOTIENT = DigitList._$toNumber<QUOTIENT_LIST & DigitList.DigitList>
> =
  Boolean._$xnor<
    A_SGN extends '+' ? true : false,
    B_SGN extends '+' ? true : false
  > extends true
    ? QUOTIENT
    : Number._$negate<QUOTIENT & Number.Number>

interface Divide_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$divide<A, typeof x> : never
}

/**
 * `Divide` is a type-level function that takes in two integers and performs a division operation.
 * It returns the result of the division operation.
 *
 * @template {Number.Number} A - An integer to divide.
 * @template {Number.Number} B - An integer to divide by.
 * @returns {Number.Number} An integer type.
 *
 * If `A` is not a multiple of `B`, the quotient is returned and the remainder is thrown away.
 * The quotient is truncated towards zero. That is, `-1/2` is evaluated to be 0, not -1.
 *
 * If either input is not a integer, `never` is returned.
 *
 * @example
 * For example, we can use `Divide` to create a division operation that divides 10 by -2:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.Divide, 10>, -2>; // -5
 * ```
 *
 * @example
 * If `A` is not a multiple of `B`, the result is truncated towards zero,
 * and only the quotient is returned.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.Divide, -100>, 99>; // -1
 * ```
 *
 * @example
 * If one of the inputs is not a integer, `never` is returned.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type IsNever = $<Integer.Divide, -42.42>; // never
 * ```
 */
export interface Divide extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Divide_T<typeof x> : never
}
