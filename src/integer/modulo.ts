import { Kind, Type, Boolean, Number, NaturalNumber, DigitList } from '..'

/**
 * `Modulo` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the floored modulo of `A` divided by `B`.
 *
 * Modulo `k` is defined as `k := n - d * q` where `q` is the integer such that
 * `k` has the same sign as the divisor `d` while being as close to 0 as possible.
 *
 * Modulo `k` is also equivalent to `k := ((n % d) + d) % d`,
 * where `%` is the remainder operator.
 *
 * The sign of output `k` is always the same as the divisor `B`,
 * and the value of `k` is always within the range `-B < k < B`.
 *
 * @param {Number.Number} A - An integer to divide.
 * @param {Number.Number} B - An integer to divide by.
 * @returns {Number.Number} An integer type.
 */
export type _$modulo<
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
  MODULUS_LIST extends DigitList.DigitList = DigitList._$modulo<A_LIST, B_LIST>
> = Boolean._$xnor<
  A_SGN extends '+' ? true : false,
  B_SGN extends '+' ? true : false
> extends true
  ? B_SGN extends '+'
    ? DigitList._$toNumber<MODULUS_LIST>
    : Number._$negate<DigitList._$toNumber<MODULUS_LIST>>
  : B_SGN extends '+'
  ? DigitList._$toNumber<DigitList._$subtract<B_LIST, MODULUS_LIST>>
  : Number._$negate<
      DigitList._$toNumber<DigitList._$subtract<B_LIST, MODULUS_LIST>>
    >

interface Modulo_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$modulo<A, typeof x> : never
}

/**
 * `Modulo` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the floored modulo of `A` divided by `B`.
 *
 * Modulo `k` is defined as `k := n - d * q` where `q` is the integer such that
 * `k` has the same sign as the divisor `d` while being as close to 0 as possible.
 *
 * Modulo `k` is also equivalent to `k := ((n % d) + d) % d`,
 * where `%` is the remainder operator in javascript.
 *
 * The sign of output `k` is always the same as the divisor `B`,
 * and the value of `k` is always within the range `-B < k < B`.
 *
 * @param {Number.Number} A - An integer to divide.
 * @param {Number.Number} B - An integer to divide by.
 * @returns {Number.Number} An integer type or `never`.
 *
 * @example
 * For example, we can use `Modulo` to determine the modulo of an integer
 * divided by another integer. In this example, `10`, `-10` and `3`, `-3` are
 * passed as type arguments to the type-level function:
 *
 * We apply `Modulo` to `10` and `-10`, and then to `3` and `-3` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Integer.Modulo, 10>, 3>; // 1
 * type Result2 = $<$<Integer.Modulo, 10>, -3>; // -2
 * type Result3 = $<$<Integer.Modulo, -10>, 3>; // 2
 * type Result4 = $<$<Integer.Modulo, -10>, -3>; // -1
 * ```
 *
 * @example
 * Here we calculate the modulo of `123` or `-123` divided by `17` or `-17`:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Integer.Modulo, 123>, 17>; // 4
 * type Result2 = $<$<Integer.Modulo, 123>, -17>; // -13
 * type Result3 = $<$<Integer.Modulo, -123>, 17>; // 13
 * type Result4 = $<$<Integer.Modulo, -123>, -17>; // -4
 * ```
 */
export interface Modulo extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Modulo_T<typeof x> : never
}
