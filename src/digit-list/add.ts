import { Digit, DigitList, Kind, Type } from "..";

type _$bothDigitListsEmpty<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = A extends [] ? (B extends [] ? true : false) : false;

type _$add2<
  /**
   * The first digit list to add.
   */
  A extends DigitList.DigitList,
  /**
   * The second digit list to add.
   */
  B extends DigitList.DigitList,
  /**
   * The carry digit from the previous iteration. Is either "0" or "1".
   */
  CARRY extends Digit.Digit = Digit.Zero,
  /**
   * The previous iteration's result. On each iteration, the result is prepended
   * to this list.
   */
  OUTPUT extends DigitList.DigitList = [],
  /**
   * The last digit of the first digit list. On each iteration, we process the
   * last digit, since that's the least significant digit.
   *
   * If the first digit list is empty, then this is "0".
   */
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  /**
   * The last digit of the second digit list.
   *
   * If the second digit list is empty, then this is "0".
   */
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  /**
   * The next digit list of A, which is the first digit list without its last
   * digit.
   *
   * If the first digit list is empty, then this is an empty list. We iterate
   * until both digit lists are empty.
   */
  NEXT_A extends DigitList.DigitList = DigitList._$pop<A>,
  /**
   * The next digit list of B, which is the second digit list without its last
   * digit.
   */
  NEXT_B extends DigitList.DigitList = DigitList._$pop<B>,
  /**
   * The sum of the last digits of A and B, according to modular arithmetic.
   * This encodes the 'ones' place of the result, not including the carry value.
   */
  SUM extends Digit.Digit = Digit._$add<A_LAST, B_LAST>,
  /**
   * The carry digit from the sum of the last digits of A and B, according to
   * modular arithmetic. This encodes the initial 'tens' place of the result.
   */
  SUM_TENS extends Digit.Digit = Digit._$addTens<A_LAST, B_LAST>,
  /**
   * If the sum and the current carry digit add up to "10" or more, then we need
   * to carry a "1" to the next iteration.
   */
  CARRY_SUM extends Digit.Digit = Digit._$addTens<SUM, CARRY>,
  /**
   * If the sum of A and B is "10" or more, then we need to carry a "1" to the
   * next iteration.
   *
   * As well, if the ones place sum of A and B, and the carry digit is "10" or
   * more, then we need to carry a "1" to the next iteration.
   */
  NEXT_CARRY extends Digit.Digit = SUM_TENS extends "1" ? "1" : CARRY_SUM,
  /**
   * The ones place of the sum of A and B, including the carry digit.
   */
  RESULT extends Digit.Digit = Digit._$add<CARRY, SUM>,
  /**
   * The next output result, which is the result of this iteration prepended to
   * the previous iteration's result.
   *
   * We evaluate arithmetic from right to left, because base-10 arithmetic is
   * little endian.
   */
  NEXT_OUTPUT extends DigitList.DigitList = [RESULT, ...OUTPUT],
  /**
   * We are done when both digit lists are empty.
   */
  IS_BASE_CASE = _$bothDigitListsEmpty<A, B>,
  /**
   * If both digit lists are empty, then we prepend the carry digit to the
   * output, and we are done. If the carry digit is "0", then we don't prepend.
   */
  FINAL_OUTPUT = CARRY extends "1" ? [CARRY, ...OUTPUT] : OUTPUT
  /**
   * If we are not done, then we recurse to the next iteration - otherwise, we
   * return the final output.
   */
> = IS_BASE_CASE extends true
  ? FINAL_OUTPUT
  : _$add2<NEXT_A, NEXT_B, NEXT_CARRY, NEXT_OUTPUT>;

export type _$add<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  SUM = _$add2<A, B>,
  /**
   * In the case that we inputted two empty digit lists, we return the standard
   * representation of the number zero, ["0"].
   */
  RESULT = SUM extends [] ? [Digit.Zero] : SUM
> = RESULT;

declare abstract class Add_T<X extends DigitList.DigitList> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$add<X, typeof x>;
}

export declare abstract class Add extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => Add_T<typeof x>;
}
