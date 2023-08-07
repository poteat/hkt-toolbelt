import { Type, Number, Kind, DigitList, NaturalNumber } from '..';

/**
 * `_$compare` is a type-level function that takes in
 * two natural number types `A` and `B`, and returns the comparison result as a number type.
 * The result will be 1 if `A` is greater than `B`,
 * 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
 *
 * @param A A natural number type.
 * @param B A natural number type.
 *
 * @example
 * For example, we can use `_$compare` to compare two natural numbers.
 * In this example, we compare 123 and 321:
 *
 * ```ts
 * import { NaturalNumber } from "hkt-toolbelt";
 *
 * type Result1 = NaturalNumber._$compare<123, 321>; // -1
 * type Result2 = NaturalNumber._$compare<321, 123>; // 1
 * ```
 *
 * We can also use the `Compare` higher-order type with the `$` type-level
 * applicator to achieve the same result:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result1 = $<$<NaturalNumber.Compare, 123>, 321>; // -1
 * type Result2 = $<$<NaturalNumber.Compare, 321>, 123>; // 1
 * ```
 */
export type _$compare<
  A extends Number.Number,
  B extends Number.Number,
  A_LIST extends DigitList.DigitList = NaturalNumber._$toList<A>,
  B_LIST extends DigitList.DigitList = NaturalNumber._$toList<B>,
  RESULT extends -1 | 0 | 1 = DigitList._$compare<A_LIST, B_LIST>
> = RESULT;

interface Compare_T<A extends Number.Number> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$compare<A, typeof x> : never;
}

/**
 * `Compare` is a type-level function that takes in
 * two natural number types `A` and `B`, and returns the comparison result as a number type.
 * The result will be 1 if `A` is greater than `B`,
 * 0 if `A` is equal to `B`, and -1 if `A` is less than `B`.
 *
 * @param A A natural number type.
 * @param B A natural number type.
 *
 * @example
 * For example, we can use `Compare` to compare two natural numbers.
 * In this example, we compare 123 and 321:
 *
 * ```ts
 * import { $, NaturalNumber } from "hkt-toolbelt";
 *
 * type Result1 = $<$<NaturalNumber.Compare, 123>, 321>; // -1
 * type Result2 = $<$<NaturalNumber.Compare, 321>, 123>; // 1
 * ```
 */
export interface Compare extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? Compare_T<typeof x> : never;
}
