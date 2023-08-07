import { Digit, DigitList, Kind, Type } from '..'

type _$add2<
  /**
   * The first digit list to add.
   */
  A extends DigitList.DigitList,
  /**
   * The second digit list to add. This can be swapped with `A` without changing
   * the result, since addition is commutative.
   */
  B extends DigitList.DigitList,
  /**
   * The carry digit. This is initially set to `Digit.Zero`, by default, but is
   * set on recursive calls to the result of the tens place addition. This has
   * parity with the classical 'full adder' circuit, where the carry digit is
   * the carry-over from the tens place addition.
   *
   * In the next place (since addition is computed from right-to-left), this
   * digit is added to the sum of the digits in the next place.
   *
   * Ths digit will either be "0" or "1".
   */
  CARRY extends Digit.Digit = Digit.Zero,
  /**
   * The output digit list. This is initially set to the empty digit list, by
   * default, but is set on recursive calls to the result of the addition of the
   * current place.
   */
  OUTPUT extends DigitList.DigitList = [],
  /**
   * The last digit of the first digit list. This is used to compute the sum of
   * the current place - the sum of the current place is the sum of the last
   * digits of the first and second digit lists, plus the carry digit.
   */
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  /**
   * The last digit of the second digit list. This is used to compute the sum of
   * the current place.
   */
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  /**
   * The next copy of the first digit list that we pass to the recursive call.
   * This has the last digit removed, as it has been processed.
   */
  A_NEXT extends DigitList.DigitList = DigitList._$pop<A>,
  /**
   * The next copy of the second digit list that we pass to the recursive call.
   * This has the last digit removed, as it has been processed.
   */
  B_NEXT extends DigitList.DigitList = DigitList._$pop<B>,
  /**
   * The 'ones place' digit sum of the current place, without the carry digit.
   */
  SUM extends Digit.Digit = Digit._$add<A_LAST, B_LAST>,
  /**
   * The 'tens place' digit sum of the current place, without the carry digit.
   */
  SUM_TENS extends Digit.Digit = Digit._$addTens<A_LAST, B_LAST>,
  /**
   * The 'ones place' digit sum of the current place, with the carry digit.
   */
  SUM_CARRY extends Digit.Digit = Digit._$add<SUM, CARRY>,
  /**
   * The 'tens place' digit sum of the current place, with the carry digit.
   */
  SUM_CARRY_TENS extends Digit.Digit = Digit._$addTens<SUM, CARRY>,
  /**
   * The carry digit to pass to the next recursive call. This is the 'tens
   * place' digit sum of the current place, with the carry digit.
   *
   * Essentially we are saying that the carry digit is '1' if _either_ of the
   * tens place digit sums are '1'. This is essentially a logical OR operation.
   */
  CARRY_NEXT extends Digit.Digit = SUM_TENS extends '1' ? '1' : SUM_CARRY_TENS,
  /**
   * The output digit list to pass to the next recursive call. This is the
   * result of the current 'ones place' digit sum, with the carry digit taken
   * into account.
   *
   * We prepend this digit result to the front of the output digit list.
   */
  OUTPUT_NEXT extends DigitList.DigitList = [SUM_CARRY, ...OUTPUT],
  /**
   * A boolean flag that indicates whether or not we are done adding the two
   * digit lists. We are done if both digit lists are empty.
   */
  DONE = A extends [] ? (B extends [] ? true : false) : false,
  /**
   * The result of the addition. This is the output digit list, with the carry
   * digit prepended to the front if it is '1'.
   */
  RESULT = CARRY extends '1' ? [CARRY, ...OUTPUT] : OUTPUT
  /**
   * The core computation loop of the addition algorithm. This is a recursive
   * function that takes in the two digit lists to add, and returns the result
   * of the addition.
   *
   * If we are done adding the two digit lists, we return the result of the
   * addition - otherwise we continue to add the two digit lists based on the
   * parameters that were computed.
   */
> = DONE extends true ? RESULT : _$add2<A_NEXT, B_NEXT, CARRY_NEXT, OUTPUT_NEXT>

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
 * import { DigitList } from "hkt-toolbelt"
 *
 * type Result = DigitList._$add<["1", "2", "3"], ["4", "5", "6"]> // ["5",
 * "7", "9"]
 * ```
 */
export type _$add<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  SUM = _$add2<A, B>,
  RESULT = SUM extends [] ? [Digit.Zero] : SUM
> = RESULT

interface Add_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$add<X, typeof x>
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
 * import { $, DigitList } from "hkt-toolbelt"
 *
 * type Result = $<$<DigitList.Add, ["1", "2", "3"]>, ["4", "5", "6"]> // ["5",
 * "7", "9"]
 * ```
 */
export interface Add extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Add_T<typeof x>
}
