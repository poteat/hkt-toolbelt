import { Type, Kind, Digit, DigitList } from '..'

type _$decrement2<
  /**
   * A represents the digit list required for decrementing. It is the subject
   * of our subtraction operation.
   */
  A extends DigitList.DigitList,
  /**
   * The carry digit CARRY comes into play when a 0 digit needs to be
   * decremented: we must "borrow" 1 from the next digit to assess that
   * operation.
   *
   * This borrowed value initially is '1' to decrement the list, but
   * transitions to '0' once the decrementing is done, acting as our exit flag
   * for the recursive function.
   */
  CARRY extends Digit.Digit = '1',
  /**
   * OUTPUT accumulates the result of the decrementing operation. It stores the
   * decremented values, built from right to left as each digit in the subject
   * is decremented in turn.
   */
  OUTPUT extends DigitList.DigitList = [],
  /**
   * A_LAST takes the last digit from the list A and gets willingly subjected
   * to a decrement operation.
   */
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  /**
   * A_POP removes the last digit from A after it has been decremented and
   * accounted for in the OUTPUT, adjusting A for the subsequent decrementing
   * pass with the adjusted list.
   */
  A_POP extends DigitList.DigitList = DigitList._$pop<A>,
  /**
   * NEXT_A prepares us for the next cycle of our recursive decrement by
   * assessing whether are initially all 0's (if true, this gets set to an
   * empty list avoiding further unnecessary operations).
   */
  NEXT_A extends DigitList.DigitList = A_POP extends '0'[] ? [] : A_POP,
  /**
   * DECREMENT takes care of making the actual change to the digit, either
   * adjusting it in line with the carry, or passing it through as-is if carry
   * is '0'.
   */
  DECREMENT extends Digit.Digit = CARRY extends '1'
    ? Digit._$decrement<A_LAST>
    : A_LAST,
  /**
   * NEXT_CARRY evaluates whether we need to perform another borrow operation.
   * If we have just subtracted from a base 10 digit (i.e., CARRY is '1'),
   * check if the last digit was also '0'.
   *
   * If it was, another borrow operation is needed, so NEXT_CARRY becomes '1',
   * otherwise it becomes '0'.
   */
  NEXT_CARRY extends Digit.Digit = CARRY extends '1'
    ? Digit._$decrementTens<A_LAST>
    : '0',
  /**
   * NEXT_OUTPUT preprends the latest result of the decrement operation to the
   * OUTPUT, building it up incrementally over each execution.
   */
  NEXT_OUTPUT extends DigitList.DigitList = [DECREMENT, ...OUTPUT],
  /**
   * FINAL_RESULT generates an new output ['0'] conditional to CARRY reflecting
   * no successful subtraction, e.g., when we're all out of non-zero digits in
   * the input.
   */
  FINAL_RESULT = CARRY extends '1' ? ['0'] : OUTPUT,
  /**
   * SHORT_CIRCUIT works to effectively terminate our recursive function once
   * we hit an all-zero list (then we just return the OUTPUT straightaway), it
   * makes the function way more efficient.
   */
  SHORT_CIRCUIT = A extends '0'[] ? OUTPUT : [...A, ...OUTPUT]
> = A extends '0'[]
  ? FINAL_RESULT
  : CARRY extends '0'
    ? SHORT_CIRCUIT
    : _$decrement2<NEXT_A, NEXT_CARRY, NEXT_OUTPUT>

/**
 * `_$decrement` is a type-level function that takes in a digit list `A` and
 * returns a new digit list representing the result of decrementing the input
 * digit list by 1. If the input digit list is empty or represents zero, the
 * result will be a digit list representing zero.
 *
 * @template A - A digit list type.
 *
 * @example
 * For example, we can use `_$decrement` to decrement a digit list representing
 * the number 42 by 1. In this example, the digit list `["4", "2"]` is passed as
 * a type argument to the type-level function:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$decrement<["4", "2"]>; // ["4", "1"]
 * ```
 *
 * @example
 * We can also use `_$decrement` with an empty digit list or a digit list
 * representing zero. In both cases, the result will be a digit list
 * representing zero:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result1 = DigitList._$decrement<[]>; // ["0"]
 * type Result2 = DigitList._$decrement<["0"]>; // ["0"]
 * ```
 */
export type _$decrement<A extends DigitList.DigitList> = DigitList._$trim<
  A extends '0'[] ? ['0'] : _$decrement2<A>
>

/**
 * `Decrement` is a type-level function that takes in a digit list `A` and
 * returns a new digit list representing the result of decrementing the input
 * digit list by 1. If the input digit list is empty or represents zero, the
 * result will be a digit list representing zero.
 *
 * @template A - A digit list type.
 *
 * @example
 * For example, we can use `Decrement` to decrement a digit list representing
 * the number 42 by 1. In this example, the digit list `["4", "2"]` is passed as
 * a type argument to the type-level function:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<DigitList.Decrement, ["4", "2"]>; // ["4", "1"]
 * ```
 *
 * @example
 * We can also use `Decrement` with an empty digit list or a digit list
 * representing zero. In both cases, the result will be a digit list
 * representing zero:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result1 = $<DigitList.Decrement, []>; // ["0"]
 * type Result2 = $<DigitList.Decrement, ["0"]>; // ["0"]
 * ```
 */
export interface Decrement extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$decrement<typeof x>
}
