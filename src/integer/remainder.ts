import { Kind, Type, Boolean, Number, NaturalNumber, DigitList } from '..'

/**
 * `_$remainder` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the remainder of `A` divided by `B`.
 *
 * @param A The number to divide.
 * @param B The number to divide by.
 */
export type _$remainder<
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
  REMAINDER_LIST extends DigitList.DigitList = DigitList._$modulo<
    A_LIST,
    B_LIST
  >,
  REMAINDER extends Number.Number = DigitList._$toNumber<REMAINDER_LIST>
> = Boolean._$xnor<
  A_SGN extends '+' ? true : false,
  B_SGN extends '+' ? true : false
> extends true
  ? REMAINDER
  : Number._$negate<REMAINDER>

interface Remainder_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true
    ? _$remainder<A, typeof x>
    : never
}

/**
 * `Remainder` is a type-level function that takes in two integer types,
 * `A` and `B`, and returns the remainder of `A` divided by `B`.
 *
 * @param A The number to divide.
 * @param B The number to divide by.
 *
 * ## Usage Examples
 *
 * @example
 * For example, we can use `Remainder` to determine the remainder of a natural
 * number divided by another natural number. In this example, all four combinations of
 * `+/-3`, `+/-2` are passed as type arguments to the type-level function:
 *
 * We apply `Remainder` to `+/-3`, and then to `+/-2` respectively using the `$`
 * type-level applicator:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Integer.Remainder, 3>, 2>; // 1
 * type Result2 = $<$<Integer.Remainder, -3>, -2>; // 1
 * type Result3 = $<$<Integer.Remainder, 3>, -2>; // -1
 * type Result4 = $<$<Integer.Remainder, -3>, 2>; // -1
 * ```
 *
 * @example
 * Here we calculate the remainder of `10` divided by `3`:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result = $<$<Integer.Remainder, 10>, 3>; // 1
 * type Result = $<$<Integer.Remainder, -10>, -3>; // 1
 * type Result = $<$<Integer.Remainder, 10>, -3>; // -1
 * type Result = $<$<Integer.Remainder, -10>, 3>; // -1
 * ```
 */
export interface Remainder extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Remainder_T<typeof x> : never
}
