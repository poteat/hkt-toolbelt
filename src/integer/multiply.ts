import { Type, Number, Kind, DigitList, Boolean, NaturalNumber } from '..'

/**
 * `_$multiply` is a type-level function that takes in two integers `A` and `B`,
 * and returns the product of the two integers.
 *
 * @template {Number.Number} A - An integer.
 * @template {Number.Number} B - An integer.
 * @returns {Number.Number} An integer type.
 *
 * @example
 * For example, we can use `_$multiply` to multiply the two integers -123 and 456:
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt"
 *
 * type Result = Integer._$multiply<-123, 456> // -56088
 * type ResultStr = Integer._$multiply<'-123', '456'> // -56088
 * ```
 *
 * @example
 * If one of the inputs is zero, the result will be zero.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type IsZero = Integer._$multiply<-42, 0>; // 0
 * ```
 */
export type _$multiply<
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
  PRODUCT_LIST extends DigitList.DigitList = DigitList._$multiply<
    A_LIST,
    B_LIST
  >,
  PRODUCT extends Number.Number = DigitList._$toNumber<PRODUCT_LIST>
> =
  Boolean._$xnor<
    A_SGN extends '+' ? true : false,
    B_SGN extends '+' ? true : false
  > extends true
    ? PRODUCT
    : Number._$negate<PRODUCT>

interface Multiply_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$multiply<A, typeof x> : never
}

/**
 * `Multiply` is a type-level function that multiplies an integer by another integer.
 * It returns the result of the multiplication operation.
 *
 * @template {Number.Number} A - - An integer.
 * @template {Number.Number} B - - An integer.
 * @returns {Number.Number} An integer type or `never`.
 *
 * If one or more of the inputs is not an integer, an error is emitted.
 *
 * @example
 * For example, we can use `Multiply` to multiply an integer 456 by another integer -123:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Is504 = $<$<NaturalNumber.Multiply, -123>, 456>; // -56088
 * type Is504Str = $<$<NaturalNumber.Multiply, '-123'>, '456'>; // -56088
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
 * If one of the inputs is not an integer, `never` is returned.
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
  ): Number._$isInteger<typeof x> extends true ? Multiply_T<typeof x> : never
}
