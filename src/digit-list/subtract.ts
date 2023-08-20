import { Digit, DigitList, Kind, Type } from '..'

/**
 * For each digit in the multiplicand, from right to left, we perform a digit-
 * wise subtraction of the minued minus the subtrahend digit, and prepend the
 * result to the output digit list.
 *
 * At each step, we account for the carry digit from the previous iteration.
 *
 * The case whereby A and B are of unequal length is handled implicitly via the
 * definition of the '_$last' utility, which returns a 'zero' digit if the list
 * is empty.
 */
type _$subtract2<
  /**
   * The minuend, i.e. the amount to subtract from, i.e. A in A - B
   */
  A extends DigitList.DigitList,
  /**
   * The subtrahend, i.e. the amount to subtract by, i.e. B in A - B
   */
  B extends DigitList.DigitList,
  /**
   * The carry digit, which is either '0' or '1'. This is percolated through the
   * subtraction algorithm, to account for borrowing. This is set to one on the
   * next iteration if the current digit-wise subtraction would result in a
   * negative number. (i.e. if the minuend digit is less than the subtrahend)
   */
  CARRY extends Digit.Digit = '0',
  /**
   * The output digit list, which is the result of the subtraction. This is
   * built up as we proceed through the subtraction algorithm from right to
   * left.
   *
   * Each iteration of the subtraction algorithm, we prepend the result of the
   * digit-wise subtraction to the output digit list.
   */
  OUTPUT extends DigitList.DigitList = [],
  /**
   * The last digit of the minuend. The last element is the rightmost digit,
   * which is the least significant digit - and thus the next digit to be
   * subtracted.
   */
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  /**
   * The last digit of the subtrahend.
   */
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  /**
   * The next instance of A, with the last digit popped off. We consume one
   * digit of the minuend each iteration.
   */
  A_NEXT extends DigitList.DigitList = DigitList._$pop<A>,
  /**
   * The next instance of B, with the last digit popped off.
   */
  B_NEXT extends DigitList.DigitList = DigitList._$pop<B>,
  /**
   * The result of the digit-wise subtraction of the last digit of the minuend
   * and the last digit of the subtrahend. The result of digit-wise subtraction
   * wraps around via modulus rules, i.e. (A[i] - B[i]) % 10
   */
  SUB extends Digit.Digit = Digit._$subtract<A_LAST, B_LAST>,
  /**
   * The borrow digit from the current digit-wise subtraction. This is either
   * '0' or '1', depending on whether we need to borrow from the next digit,
   * i.e. if A[i] < B[i].
   *
   * Note: this doesn't take into account the carry digit from the previous
   * iteration. This is handled by the `SUB_CARRY` type parameter.
   */
  SUB_TENS extends Digit.Digit = Digit._$subtractTens<A_LAST, B_LAST>,
  /**
   * We subtract the carry digit from the digit-wise subtraction, which is
   * either '0' or '1', depending on whether we borrowed from the current digit
   * during the previous iteration.
   *
   * This is subject to modulo rules.
   */
  SUB_CARRY extends Digit.Digit = Digit._$subtract<SUB, CARRY>,
  /**
   * We subtract the carry digit from the digit-wise subtraction, which is
   * either '0' or '1', and capture the tens-place digit of the result.
   *
   * This digit corresponds to whether accounting for the previous borrow, if
   * one existed, would cause us to 'run out' of value in the current digit.
   *
   * Notably, because we are only performing digit-wise subtraction, and not
   * taking into account SUB_TENS in this calculation, it does not quite
   * represent whether or not we need to borrow from the next digit. This is
   * instead handled by the `CARRY_NEXT` type parameter.
   */
  SUB_CARRY_TENS extends Digit.Digit = Digit._$subtractTens<SUB, SUB_CARRY>,
  /**
   * The carry digit for the next iteration. This is either '0' or '1'. We base
   * this off of whether either `SUB_TENS` or `SUB_CARRY_TENS` is '1'.
   *
   * Basically, C[i + 1] = 1 if A[i] < B[i] or if A[i] < B[i] + C[i], otherwise
   * C[i + 1] = 0. We check this separately for performance reasons - otherwise
   * we would need to perform an additional full subtraction step.
   *
   * This is passed as the `CARRY` type parameter to the next iteration.
   */
  CARRY_NEXT extends Digit.Digit = SUB_TENS extends '1' ? '1' : SUB_CARRY_TENS,
  /**
   * The output digit list for the next iteration. We prepend the result of the
   * digit-wise subtraction to the output digit list, with the carry digit
   * accounted for.
   */
  OUTPUT_NEXT extends DigitList.DigitList = [SUB_CARRY, ...OUTPUT],
  /**
   * We are done when we have no more digits to subtract, i.e. when both A and
   * B are empty.
   */
  DONE = A extends [] ? (B extends [] ? true : false) : false,
  /**
   * The result of the subtraction. Notably, if we have a carry digit at the
   * end, this implies that the result is negative, and so we return zero.
   */
  RESULT = CARRY extends '1' ? ['0'] : OUTPUT
> = DONE extends true
  ? RESULT
  : _$subtract2<A_NEXT, B_NEXT, CARRY_NEXT, OUTPUT_NEXT>

/**
 * `_$subtract` is a type-level function that subtracts one digit list from
 * another. It returns the result of the subtraction.
 *
 * @template A - A digit list representing a number to subtract.
 * @template B - A digit list representing a number to subtract by.
 *
 * @example
 * For example, we can use `_$subtract` to subtract one digit list from another:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$subtract<["1", "2", "5"], ["1", "2", "1"]>;
 * // ["4"]
 * ```
 *
 * In this example, `Result` is a type that represents ["4"], which is the
 * result of subtracting ["1", "2", "5"] from ["1", "2", "1"].
 */
export type _$subtract<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$trim<_$subtract2<A, B>>

interface Subtract_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$subtract<X, typeof x>
}

/**
 * `Subtract` is a type-level function that subtracts one digit list from
 * another. It returns the result of the subtraction.
 *
 * @template A - A digit list representing a number to subtract.
 * @template B - A digit list representing a number to subtract by.
 *
 * @example
 * For example, we can use `Subtract` to subtract one digit list from another:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Subtract, ["5", "0"], ["2", "5"]>; // ["2", "5"]
 * ```
 *
 * In this example, `Result` is a type that represents ["2", "5"], which is the
 * result of subtracting ["2", "5"] from ["5", "0"].
 */
export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Subtract_T<typeof x>
}
