import { Type, Number as Number_, Kind, DigitList, NaturalNumber } from '..'

/**
 * `Modulo` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the remainder of `A` divided by `B`.
 *
 * @template A - The number to divide.
 * @template B - The number to divide by.
 */
export type _$modulo<
  A extends Number_.Number,
  B extends Number_.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  MODULUS_LIST = DigitList._$modulo<A_LIST, B_LIST>,
  MODULUS = DigitList._$toNumber<Type._$cast<MODULUS_LIST, DigitList.DigitList>>
> = MODULUS

export interface Modulo_T<A extends Number_.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? _$modulo<A, typeof x> : never
}

/**
 * `Modulo` is a type-level function that takes in two natural number types,
 * `A` and `B`, and returns the remainder of `A` divided by `B`.
 *
 * @template A - The number to divide.
 * @template B - The number to divide by.
 *
 * ## Usage Examples
 *
 * @example
 * For example, we can use `Modulo` to determine the remainder of a natural
 * number divided by another natural number. In this example, `3` and `2` are
 * passed as type arguments to the type-level function:
 *
 * We apply `Modulo` to `3`, and then to `2` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.Modulo, 3>, 2>; // 1
 * ```
 *
 * @example
 * Here we calculate the remainder of `10` divided by `3`:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result = $<$<NaturalNumber.Modulo, 10>, 3>; // 1
 * ```
 */
export interface Modulo extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number_.Number>
  ): Number_._$isNatural<typeof x> extends true ? Modulo_T<typeof x> : never
}

/**
 * Given two natural numbers, return the remainder of the division.
 *
 * @param {number} a - The numerator.
 * @param {number} b - The denominator.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.modulo(10)(3)
 * //    ^? 1
 * ```
 */
export const modulo = ((a: number) => (b: number) =>
  Number(a) % Number(b)) as Kind._$reify<Modulo>
