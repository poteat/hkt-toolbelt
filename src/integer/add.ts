import { Type, Number, Kind, DigitList, NaturalNumber } from '..'

/**
 * `_$add` is a type-level function that takes in two integers `A` and `B`,
 * and returns the sum of the two integers.
 *
 * @template {Number.Number} A - An integer.
 * @template {Number.Number} B - An integer.
 * @returns {Number.Number} An integer type or `never`.
 *
 * @example
 * For example, we can use `_$add` to add the two integers -123 and 456:
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt"
 *
 * type Result = Integer._$add<-123, 456> // 333
 * ```
 */
export type _$add<
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
  IS_A_GREATER extends 1 | 0 | -1 = DigitList._$compare<A_LIST, B_LIST>,
  SUM = A_SGN extends '+'
    ? B_SGN extends '+'
      ? DigitList._$toNumber<DigitList._$add<A_LIST, B_LIST>>
      : IS_A_GREATER extends 0
        ? 0
        : IS_A_GREATER extends 1
          ? DigitList._$toNumber<DigitList._$subtract<A_LIST, B_LIST>>
          : Number._$fromString<`-${DigitList._$toNumber<
              DigitList._$subtract<B_LIST, A_LIST>
            >}`>
    : B_SGN extends '+'
      ? IS_A_GREATER extends 0
        ? 0
        : IS_A_GREATER extends 1
          ? Number._$fromString<`-${DigitList._$toNumber<
              DigitList._$subtract<A_LIST, B_LIST>
            >}`>
          : DigitList._$toNumber<DigitList._$subtract<B_LIST, A_LIST>>
      : Number._$fromString<`-${DigitList._$toNumber<
          DigitList._$add<A_LIST, B_LIST>
        >}`>
> = SUM

interface Add_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$add<A, typeof x> : never
}

/**
 * `Add` is a type-level function that takes in two integers `A` and `B`,
 * and returns the sum of the two integers.
 *
 * @template {Number.Number} A - An integer.
 * @template {Number.Number} B - An integer.
 * @returns {Number.Number} An integer type or `never`.
 *
 * If one or more of the inputs is not an integer, an error is emitted.
 *
 * @example
 * For example, we can use `Add` to add the two integers -123 and 456:
 *
 * We apply `Add` to -123 and 456 respectively using
 * the `$` type-level applicator:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt"
 *
 * type Result = $<$<Integer.Add, -123>, 456> // 333
 * ```
 *
 * @example
 * If one of the inputs is not a natural number, `never` is returned.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type IsNever = $<Integer.Add, -42.42>; // never
 * ```
 */
export interface Add extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Add_T<typeof x> : never
}
