import { Type, Kind, Digit, DigitList } from '..'

type _$divide2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  /**
   * The operation to perform. Either "DIVIDE" or "MODULO". This only controls
   * what we return at the end of the division.
   */
  OPERATION extends 'DIVIDE' | 'MODULO' = 'DIVIDE',
  /**
   * The list of active digits to process, from left to right.
   */
  DIVIDEND extends DigitList.DigitList = A,
  /**
   * The current quotient, which we append to as we go.
   */
  QUOTIENT extends DigitList.DigitList = [],
  /**
   * The current remainder, which we append to and subtract from according to
   * the rules of long division. This corresponds to the 'bottom' of the long
   * division algorithm.
   */
  REMAINDER extends DigitList.DigitList = [],
  /**
   * The leftmost digit of the remaining dividend.
   */
  ACTIVE extends Digit.Digit = DIVIDEND[0],
  /**
   * In the long division algorithm, we append the active digit to the remainder
   * of the previous step. This is where you 'draw an arrow down' in the long
   * division paper algorithm.
   */
  ARROW_DOWN extends DigitList.DigitList = DigitList._$trim<
    [...REMAINDER, ACTIVE]
  >,
  /**
   * A sub-division step, computed via repeated subtraction. This results in the
   * next quotient value.
   *
   * The quotient in this step is guaranteed to be an integer from 0 to 9.
   * Therefore, the repeated subtraction will only take at max 9 steps.
   */
  SUB_DIV extends DigitList.DigitList = DigitList._$divideBySubtraction<
    ARROW_DOWN,
    B
  >,
  /**
   * The next value of DIVIDEND on each step. We shift the current value, i.e.
   * remove the leftmost digit. Once this value is empty, we have reached the
   * end of the division.
   */
  NEXT_DIVIDEND extends DigitList.DigitList = DigitList._$shift<DIVIDEND>,
  /**
   * The next value of QUOTIENT on each step. We append the quotient from the
   * sub-division step to the current value.
   */
  NEXT_QUOTIENT extends DigitList.DigitList = Type._$cast<
    [...QUOTIENT, ...SUB_DIV],
    DigitList.DigitList
  >,
  /**
   * The next value of REMAINDER on each step. This corresponds to the step in
   * the long division algorithm where you perform a subtraction step at the
   * bottom of the paper.
   *
   * For efficiency, we use the remainder from the sub-division step, which is
   * equivalent to the remainder from the subtraction step.
   */
  NEXT_REMAINDER extends DigitList.DigitList = DigitList._$divideBySubtraction<
    ARROW_DOWN,
    B,
    'MODULO'
  >,
  /**
   * We have reached the end of the division when the next dividend is empty.
   */
  DONE extends boolean = NEXT_DIVIDEND extends [] ? true : false,
  /**
   * The result of the division is the quotient and remainder, as a pair.
   */
  RESULT extends DigitList.DigitList = OPERATION extends 'DIVIDE'
    ? DigitList._$trim<NEXT_QUOTIENT>
    : NEXT_REMAINDER
> = DONE extends true
  ? RESULT
  : _$divide2<A, B, OPERATION, NEXT_DIVIDEND, NEXT_QUOTIENT, NEXT_REMAINDER>

/**
 * `_$divide` is a type-level function that performs the division or modulo operation.
 * It takes in two digit lists `A` and `B` representing the dividend and divisor respectively, and an operation type
 * which can be either "DIVIDE" or "MODULO". It checks if the divisor is 0 or 1 and returns the appropriate result.
 * If the divisor is neither 0 nor 1, it calls the `_$divide2` function to perform the division.
 *
 * @template A - A digit list representing a number to divide.
 * @template B - A digit list representing a number to divide by.
 * @template OPERATION - A string type representing the operation to be performed. Can be either "DIVIDE" or "MODULO".
 *
 * @example
 * For example, we can use `_$divide` to divide a digit list representing the number 10 by 2:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$divide<["1", "0"], ["2"], "DIVIDE">; // ["5"]
 * ```
 *
 * @example
 * We can also use `_$divide` to find the remainder when a digit list representing the number 123 is divided by 17:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$divide<["1", "2", "3"], ["1", "7"], "MODULO">; // ["4"]
 * ```
 */
export type _$divide<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  OPERATION extends 'DIVIDE' | 'MODULO' = 'DIVIDE'
> = B extends [Digit.Zero]
  ? [Digit.Zero]
  : B extends ['1']
  ? OPERATION extends 'DIVIDE'
    ? A
    : [Digit.Zero]
  : _$divide2<A, B, OPERATION>

interface Divide_T<A extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$divide<A, typeof x>
}

/**
 * `Divide` is a type-level function that performs a division operation.
 * It returns the result of the division operation.
 *
 * @example
 * For example, we can use `Divide` to create a division operation that divides a digit list representing the number 10 by 2:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.Divide, ["1", "0"]>, ["2"]>; // ["5"]
 * ```
 *
 * In this example, `Result` is a type that represents the digit list ["5"], which is the result of dividing 10 by 2.
 */
export interface Divide extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Divide_T<typeof x>
}
