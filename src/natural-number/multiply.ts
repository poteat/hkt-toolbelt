import { Type, Number, Kind, DigitList, NaturalNumber } from '..'

/**
 * `_$multiply` is a type-level function that multiplies a natural number by another natural number.
 * It returns the result of the multiplication operation.
 *
 * @param A - A natural number or a string representation of a natural number.
 * @param B - A natural number or a string representation of a natural number.
 *
 * @example
 * For example, we can use `_$multiply` to multiply a natural number 42 by another natural number 12:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Is504 = NaturalNumber._$multiply<42, 12>; // 504
 * type Is504Str = NaturalNumber._$multiply<'42', '12'>; // 504
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
export type _$multiply<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  PRODUCT_LIST extends DigitList.DigitList = DigitList._$multiply<
    A_LIST,
    B_LIST
  >,
  PRODUCT = DigitList._$toNumber<PRODUCT_LIST>
> = PRODUCT

interface Multiply_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$multiply<A, typeof x> : never
}

/**
 * `Multiply` is a type-level function that multiplies a natural number by another natural number.
 * It returns the result of the multiplication operation.
 *
 * @param A - A natural number.
 * @param B - A natural number.
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
 * type Is504Str = $<$<NaturalNumber.Multiply, '12'>, '42'>; // 504
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
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type IsNever = $<NaturalNumber.Multiply, -42.42>; // never
 * ```
 */
export interface Multiply extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Multiply_T<typeof x> : never
}
