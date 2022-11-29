import { Type, Kind, Digit, DigitList } from "..";

type _$decrement2<
  /**
   * The digit-list to decrement.
   */
  A extends DigitList.DigitList,
  /**
   * The carry bit, which encodes whether the decrement operation should carry
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
  A_POP extends DigitList.DigitList = DigitList._$pop<A>,
  NEXT_A extends DigitList.DigitList = A_POP extends "0"[] ? [] : A_POP,
  /**
   * The subtraction of the last digit of A and the carry digit.
   */
  DECREMENT extends Digit.Digit = CARRY extends "1"
    ? Digit._$decrement<A_LAST>
    : A_LAST,
  /**
   * The carry digit from the subtraction of the last digit of A and the carry
   * digit. This encodes the 'tens' place of the result.
   */
  NEXT_CARRY extends Digit.Digit = CARRY extends "1"
    ? Digit._$decrementTens<A_LAST>
    : "0",
  /**
   * The next output result, which is the result of this iteration prepended to
   * the previous iteration's result.
   */
  NEXT_OUTPUT extends DigitList.DigitList = [DECREMENT, ...OUTPUT],
  /**
   * When A is empty, we prepend the carry digit to the output if it is "1".
   * This is the final result.
   *
   * As well, if A is all zeroes, we return the output immediately.
   */
  FINAL_RESULT = CARRY extends "1" ? ["0"] : OUTPUT,
  /**
   * Is the carry bit is "0", we can skip the rest of the computation and return
   * the rest of 'A' prepended to the output.
   */
  SHORT_CIRCUIT = A extends "0"[] ? OUTPUT : [...A, ...OUTPUT]
> = A extends "0"[]
  ? FINAL_RESULT
  : CARRY extends "0"
  ? SHORT_CIRCUIT
  : _$decrement2<NEXT_A, NEXT_CARRY, NEXT_OUTPUT>;

export type _$decrement<A extends DigitList.DigitList> = DigitList._$trim<
  A extends "0"[] ? ["0"] : _$decrement2<A>
>;

export declare abstract class Decrement extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$decrement<typeof x>;
}
