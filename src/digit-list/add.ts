import { Digit, DigitList, Kind, Type } from '..';

type _$add2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  CARRY extends Digit.Digit = Digit.Zero,
  OUTPUT extends DigitList.DigitList = [],
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$pop<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$pop<B>,
  SUM extends Digit.Digit = Digit._$add<A_LAST, B_LAST>,
  SUM_TENS extends Digit.Digit = Digit._$addTens<A_LAST, B_LAST>,
  SUM_CARRY extends Digit.Digit = Digit._$add<SUM, CARRY>,
  SUM_CARRY_TENS extends Digit.Digit = Digit._$addTens<SUM, CARRY>,
  CARRY_NEXT extends Digit.Digit = SUM_TENS extends '1' ? '1' : SUM_CARRY_TENS,
  OUTPUT_NEXT extends DigitList.DigitList = [SUM_CARRY, ...OUTPUT],
  DONE = A extends [] ? (B extends [] ? true : false) : false,
  RESULT = CARRY extends '1' ? [CARRY, ...OUTPUT] : OUTPUT
> = DONE extends true
  ? RESULT
  : _$add2<A_NEXT, B_NEXT, CARRY_NEXT, OUTPUT_NEXT>;

/**
 * `_$add` is a type-level function that takes in two digit lists `A` and `B`,
 * and returns the sum of the two digit lists as a new digit list.
 *
 * @param A A digit list.
 * @param B A digit list.
 *
 * @example
 * For example, we can use `_$add` to add two digit lists representing the
 * numbers 123 and 456:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$add<["1", "2", "3"], ["4", "5", "6"]>; // ["5", "7", "9"]
 * ```
 */
export type _$add<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  SUM = _$add2<A, B>,
  RESULT = SUM extends [] ? [Digit.Zero] : SUM
> = RESULT;

interface Add_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$add<X, typeof x>;
}

/**
 * `Add` is a type-level function that takes in two digit lists `A` and `B`,
 * and returns the sum of the two digit lists as a new digit list.
 *
 * @param A A digit list.
 * @param B A digit list.
 *
 * @example
 * For example, we can use `Add` to add two digit lists representing the
 * numbers 123 and 456:
 *
 * We apply `Add` to `["1", "2", "3"]` and `["4", "5", "6"]` respectively using
 * the `$` type-level applicator:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Add, ["1", "2", "3"]>, ["4", "5", "6"]>; // ["5", "7", "9"]
 * ```
 */
export interface Add extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Add_T<typeof x>;
}
