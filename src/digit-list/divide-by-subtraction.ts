import { Type, Kind, Digit, DigitList } from "..";

type _$divideBySubtraction2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  OPERATION extends "DIVIDE" | "MODULO" = "DIVIDE",
  QUOTIENT extends DigitList.DigitList = [Digit.Zero],
  REMAINDER extends DigitList.DigitList = A,
  NEXT_QUOTIENT extends DigitList.DigitList = DigitList._$increment<QUOTIENT>,
  NEXT_REMAINDER extends DigitList.DigitList = DigitList._$subtract<
    REMAINDER,
    B
  >,
  PERFECTLY_DIVISIBLE extends boolean = REMAINDER extends B ? true : false,
  DONE extends boolean = NEXT_REMAINDER extends [Digit.Zero]
    ? true
    : PERFECTLY_DIVISIBLE,
  DIV_RESULT extends DigitList.DigitList = PERFECTLY_DIVISIBLE extends true
    ? NEXT_QUOTIENT
    : QUOTIENT,
  MOD_RESULT extends DigitList.DigitList = PERFECTLY_DIVISIBLE extends true
    ? [Digit.Zero]
    : REMAINDER,
  RESULT extends DigitList.DigitList = OPERATION extends "DIVIDE"
    ? DIV_RESULT
    : MOD_RESULT
> = DONE extends true
  ? RESULT
  : _$divideBySubtraction2<A, B, OPERATION, NEXT_QUOTIENT, NEXT_REMAINDER>;

/**
 * `_$divideBySubtraction` is a type-level function that performs the division or modulo operation by subtraction.
 * It takes in two digit lists `A` and `B` representing the dividend and divisor respectively, and an operation type
 * which can be either "DIVIDE" or "MODULO". It returns the result of the operation (division or substraction).
 *
 * @param A A digit list representing a number to divide.
 * @param B A digit list representing a number to divide by.
 * @param OPERATION A string type representing the operation to be performed. Can be either "DIVIDE" or "MODULO".
 *
 * @example
 *
 * For example, we can use `_$divideBySubtraction` to divide a digit list representing the number 10 by 2:
 *
 * ```ts
 * import { DigitList } from "hkt-toolbelt";
 *
 * type Result = DigitList._$divideBySubtraction<["1", "0"], ["2"]>; // ["5"]
 * ```
 *
 * @example
 *
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
  OPERATION extends "DIVIDE" | "MODULO" = "DIVIDE"
> = B extends [Digit.Zero]
  ? [Digit.Zero]
  : B extends ["1"]
  ? OPERATION extends "DIVIDE"
    ? A
    : [Digit.Zero]
  : _$divideBySubtraction2<A, B, OPERATION>;

interface DivideBySubtraction_T<A extends DigitList.DigitList>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ): _$divideBySubtraction<A, typeof x>;
}


/**
 * `DivideBySubtraction` is a type-level function that performs a division by subtraction.
 * It returns the result of the division.
 *
 * ## Parameters
 * 
 * @param A A digit list representing a number to divide.
 * @param B A digit list representing a number to divide by.
 *
 * @example
 *
 * For example, we can use `DivideBySubtraction` to divide a digit list representing the number 10 by 2:
 *
 * ```ts
 * import { $, DigitList } from "hkt-toolbelt";
 *
 * type Result = $<$<DigitList.DivideBySubtraction, ["1", "0"]>, ["2"]>; // ["5"] quotient is 5, and the remainder is 0.
 * ```
 *
 */
export interface DivideBySubtraction extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ): DivideBySubtraction_T<typeof x>;
}
