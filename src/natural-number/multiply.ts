import { Type, Number as Number_, Kind, DigitList, NaturalNumber } from '..'

type _$multiply2<
  A extends Number_.Number,
  B extends Number_.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  PRODUCT_LIST extends DigitList.DigitList = DigitList._$multiply<
    A_LIST,
    B_LIST
  >,
  PRODUCT = DigitList._$toNumber<PRODUCT_LIST>
> = PRODUCT

/**
 * `_$multiply` is a type-level function that multiplies a natural number by another natural number.
 * It returns the result of the multiplication operation.
 *
 * @template {Number.Number} A - A natural number to multiply.
 * @template {Number.Number} B - A natural number to multiply by.
 * @returns {Number.Number} A natural number.
 *
 * @example
 * For example, we can use `_$multiply` to multiply a natural number 42 by another natural number 12:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Is504 = NaturalNumber._$multiply<42, 12>; // 504
 * ```
 *
 * @example
 * If one of the inputs is zero, the result will be zero.
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type IsZero = NaturalNumber._$multiply<42, 0>; // 0
 * ```
 */
export type _$multiply<A extends Number_.Number, B extends Number_.Number> =
  Number_._$isNatural<A> extends true
    ? Number_._$isNatural<B> extends true
      ? _$multiply2<A, B>
      : never
    : never

interface Multiply_T<A extends Number_.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): _$multiply<A, typeof x>
}

/**
 * `Multiply` is a type-level function that multiplies a natural number by another natural number.
 * It returns the result of the multiplication operation.
 *
 * @template {Number.Number} A - A natural number to multiply.
 * @template {Number.Number} B - A natural number to multiply by.
 * @returns {Number.Number} A natural number or `never`.
 *
 * If one or more of the inputs is not zero or a natural number, an error is emitted.
 *
 * @example
 * For example, we can use `Multiply` to multiply a natural number 42 by another natural number 12:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Is504 = $<$<NaturalNumber.Multiply, 12>, 42>; // 504
 * ```
 *
 * @example
 * If one of the inputs is zero, the result will be zero.
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type IsZero = $<$<NaturalNumber.Multiply, 0>, 42>; // 0
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Multiply, -42.42>; // never
 * ```
 */
export interface Multiply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number_.Number>): Multiply_T<typeof x>
}

/**
 * Given two natural numbers, return their product.
 *
 * @param {Number.Number} a - The first natural number.
 * @param {Number.Number} b - The second natural number.
 *
 * @example
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * const result = NaturalNumber.multiply(2)(3)
 * //    ^? 6
 * ```
 */
export const multiply = ((a: Number_.Number) => (b: Number_.Number) =>
  Number_.isNatural(a as never) && Number_.isNatural(b as never)
    ? Number(a) * Number(b)
    : Type.never) as Kind._$reify<Multiply>
