import { Type, Kind, Digit, DigitList } from '..'

type _$divideBySubtraction2<
  /**
   * A represents the digit list to be divided, i.e., the dividend.
   */
  A extends DigitList.DigitList,
  /**
   * B represents the digit list by which A is to be divided, i.e., the
   * divisor.
   */
  B extends DigitList.DigitList,
  /**
   * OPERATION specifies the operation to perform (either "DIVIDE" or "MODULO").
   *
   * Default is "DIVIDE". The reason that we 'combine' the divide and modulo
   * operations into one implementation is that they're very similar in nature,
   * and the only difference is the final result.
   */
  OPERATION extends 'DIVIDE' | 'MODULO' = 'DIVIDE',
  /**
   * QUOTIENT is our current guess and accumulator of the result of division.
   * Initially, it is assigned '0' - so that we can increment it as we subtract
   * from the remainder.
   */
  QUOTIENT extends DigitList.DigitList = [Digit.Zero],
  /**
   * REMAINDER or the rest of the numbers that were not yet covered by the
   * multiples of B, starts as the original input number A.
   *
   * As we iterate, we reduce this variable by subtracting B from it. Once
   * REMAINDER is less than B, we know that we've covered all the multiples of B
   * in A, and that the remainder is the result of the modulo operation.
   */
  REMAINDER extends DigitList.DigitList = A,
  /**
   * NEXT_QUOTIENT prepares our next version of the quotient by incrementing
   * the current one, to be carried over to the next operation.
   */
  NEXT_QUOTIENT extends DigitList.DigitList = DigitList._$increment<QUOTIENT>,
  /**
   * NEXT_REMAINDER is the result of subtracting the divisor B from the current
   * remainder, which will be carried into the next round of operation.
   */
  NEXT_REMAINDER extends DigitList.DigitList = DigitList._$subtract<
    REMAINDER,
    B
  >,
  /**
   * PERFECTLY_DIVISIBLE indicates if the remainder is perfectly divisible by B.
   */
  PERFECTLY_DIVISIBLE extends boolean = REMAINDER extends B ? true : false,
  /**
   * DONE is a type predicate that helps us establish if we've successfully
   * completed the division operation - when the remainder equals 0 or when the
   * number is perfectly divisible by the divisor.
   */
  DONE extends boolean = NEXT_REMAINDER extends [Digit.Zero]
    ? true
    : PERFECTLY_DIVISIBLE,
  /**
   * DIV_RESULT holds the final result of division if A was perfectly divisible
   * by B.
   */
  DIV_RESULT extends DigitList.DigitList = PERFECTLY_DIVISIBLE extends true
    ? NEXT_QUOTIENT
    : QUOTIENT,
  /**
   * MOD_RESULT holds the final result of modulo operation if A was perfectly
   * divisible by B.
   */
  MOD_RESULT extends DigitList.DigitList = PERFECTLY_DIVISIBLE extends true
    ? [Digit.Zero]
    : REMAINDER,
  /**
   * RESULT holds the final result of the operation.
   */
  RESULT extends DigitList.DigitList = OPERATION extends 'DIVIDE'
    ? DIV_RESULT
    : MOD_RESULT
> = DONE extends true
  ? RESULT
  : _$divideBySubtraction2<A, B, OPERATION, NEXT_QUOTIENT, NEXT_REMAINDER>

/**
 * `_$divideBySubtraction` is a type-level function that performs the division or modulo operation by subtraction.
 * It takes in two digit lists `A` and `B` representing the dividend and divisor respectively, and an operation type
 * which can be either "DIVIDE" or "MODULO". It returns the result of the operation (division or substraction).
 *
 * @param A - A digit list representing a number to divide.
 * @param B - A digit list representing a number to divide by.
 * @param OPERATION - A string type representing the operation to be performed. Can be either "DIVIDE" or "MODULO".
 *
 * @example
 * For example, we can use `_$divideBySubtraction` to divide a digit list representing the number 10 by 2:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$divideBySubtraction<["1", "0"], ["2"]>; // ["5"]
 * ```
 *
 * @example
 * We can also use `_$divideBySubtraction` to find the remainder when a digit list representing the number 123 is divided by 17:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$divideBySubtraction<["1", "2", "3"], ["1", "7"], "MODULO">; // ["4"]
 * ```
 */
export type _$divideBySubtraction<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  OPERATION extends 'DIVIDE' | 'MODULO' = 'DIVIDE'
> = B extends [Digit.Zero]
  ? [Digit.Zero]
  : B extends ['1']
  ? OPERATION extends 'DIVIDE'
    ? A
    : [Digit.Zero]
  : _$divideBySubtraction2<A, B, OPERATION>

interface DivideBySubtraction_T<A extends DigitList.DigitList>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ): _$divideBySubtraction<A, typeof x>
}

/**
 * `DivideBySubtraction` is a type-level function that performs a division by subtraction.
 * It returns the result of the division.
 *
 * @param A - A digit list representing a number to divide.
 * @param B - A digit list representing a number to divide by.
 *
 * @example
 * For example, we can use `DivideBySubtraction` to divide a digit list representing the number 10 by 2:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.DivideBySubtraction, ["1", "0"]>, ["2"]>; // ["5"] quotient is 5, and the remainder is 0.
 * ```
 */
export interface DivideBySubtraction extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ): DivideBySubtraction_T<typeof x>
}
