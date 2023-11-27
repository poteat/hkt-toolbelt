import { Type, Number, Kind, DigitList, NaturalNumber } from '..'

/**
 * `_$compare` is a type-level function that takes in
 * two integer types `A` and `B`, and returns the comparison result as an integer type.
 * The result will be 1 if `A` is greater than `B`,
 * 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
 *
 * @template {Number.Number} A - An integer type.
 * @template {Number.Number} B - An integer type.
 * @returns {-1 | 0 | 1}
 *
 * @example
 * For example, we can use `_$compare` to compare two integers.
 *
 * ```ts
 * import { Integer } from "hkt-toolbelt";
 *
 * type Result1 = Integer._$compare<123, -321>; // 1
 * type Result2 = Integer._$compare<-123, 321>; // -1
 * ```
 *
 * We can also use the `Compare` higher-order type with the `$` type-level
 * applicator to achieve the same result:
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Integer.Compare, 123>, -321>; // 1
 * type Result2 = $<$<Integer.Compare, -123>, 321>; // -1
 * ```
 */
export type _$compare<
  A extends Number.Number,
  B extends Number.Number,
  A_SGN extends '+' | '-' = Number._$sign<A>,
  B_SGN extends '+' | '-' = Number._$sign<B>,
  A_INT extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<A>
  >,
  B_INT extends DigitList.DigitList = NaturalNumber._$toList<
    Number._$absolute<B>
  >
> = A_SGN extends '+'
  ? B_SGN extends '+'
    ? DigitList._$compare<A_INT, B_INT>
    : 1
  : B_SGN extends '+'
    ? -1
    : DigitList._$compare<B_INT, A_INT>

interface Compare_T<X extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? _$compare<X, typeof x> : never
}

/**
 * `Compare` is a type-level function that takes in
 * two integer types `A` and `B`, and returns the comparison result as an integer type.
 * The result will be 1 if `A` is greater than `B`,
 * 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
 *
 * @template {Number.Number} A - An integer type.
 * @template {Number.Number} B - An integer type.
 * @returns {-1 | 0 | 1 }
 *
 * @example
 * For example, we can use `Compare` to compare two integers.
 *
 * ```ts
 * import { $, Integer } from "hkt-toolbelt";
 *
 * type Result1 = $<$<Integer.Compare, 123>, -321>; // 1
 * type Result2 = $<$<Integer.Compare, -123>, 321>; // -1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isInteger<typeof x> extends true ? Compare_T<typeof x> : never
}
