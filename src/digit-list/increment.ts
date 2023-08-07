import { Type, Kind, Digit, DigitList } from "..";

export type _$increment<
  /**
   * The digit-list to increment.
   */
  A extends DigitList.DigitList,
  /**
   * The carry bit, which encodes whether the increment operation should carry
   * over to the next digit.
   */
  CARRY extends Digit.Digit = "1",
  /**
   * The current output digit-list, i.e. the list of processed digits, generated
   * from right to left.
   */
  OUTPUT extends DigitList.DigitList = [],
  /**
   * The last digit of A.
   */
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  /**
   * The next digit list of A, which is the current digit list without its last
   * element.
   */
  NEXT_A extends DigitList.DigitList = DigitList._$pop<A>,
  /**
   * The sum of the last digit of A and the carry digit.
   */
  INCREMENT extends Digit.Digit = CARRY extends "1"
    ? Digit._$increment<A_LAST>
    : A_LAST,
  /**
   * The carry digit from the sum of the last digit of A and the carry digit.
   * This encodes the 'tens' place of the result.
   */
  NEXT_CARRY extends Digit.Digit = CARRY extends "1"
    ? Digit._$incrementTens<A_LAST>
    : "0",
  /**
   * The next output result, which is the result of this iteration prepended to
   * the previous iteration's result.
   */
  NEXT_OUTPUT extends DigitList.DigitList = [INCREMENT, ...OUTPUT],
  /**
   * When A is empty, we prepend the carry digit to the output if it is "1".
   */
  FINAL_RESULT extends DigitList.DigitList = CARRY extends "1"
    ? [CARRY, ...OUTPUT]
    : OUTPUT,
  /**
   * Is the carry bit is "0", we can skip the rest of the computation and return
   * the rest of 'A' prepended to the output.
   */
  SHORT_CIRCUIT extends DigitList.DigitList = [...A, ...OUTPUT]
> = A extends []
  ? FINAL_RESULT
  : CARRY extends "0"
  ? SHORT_CIRCUIT
  : _$increment<NEXT_A, NEXT_CARRY, NEXT_OUTPUT>;

/**
 * `Increment` is a type-level function that increments a digit list.
 * It returns the incremented digit list.
 *
 * @param A - The digit list to increment.
 *
 * @example
 * For example, we can use `Increment` to increment a digit list:
 *
 * ```ts
 * import { $, DigitList, Type } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Increment, ["1", "0"]>; // ["1", "1"]
 * ```
 *
 * In this example, `Result` is a type that represents the digit list ["1", "1"], which is the result of incrementing the digit list ["1", "0"].
 */
export interface Increment extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$increment<typeof x>;
}
