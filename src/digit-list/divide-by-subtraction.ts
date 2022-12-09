import { Type, Kind, Digit, DigitList } from "..";

type _$divideBySubtraction2<
  /**
   * The dividend, i.e. the number to be divided.
   */
  A extends DigitList.DigitList,
  /**
   * The divisor, i.e. the number to divide by.
   */
  B extends DigitList.DigitList,
  /**
   * The operation to perform. Either "DIVIDE" or "MODULO". We cannot return
   * both the quotient and remainder, as that would invoke a stack depth error
   * from the compiler.
   */
  OPERATION extends "DIVIDE" | "MODULO" = "DIVIDE",
  /**
   * The quotient, i.e. the result of the division. On each step, we increment
   * this value by 1, and subtract the divisor from the dividend.
   */
  QUOTIENT extends DigitList.DigitList = [Digit.Zero],
  /**
   * The current value of A on each step. On each step, we subtract the divisor
   * from this value.
   */
  REMAINDER extends DigitList.DigitList = A,
  /**
   * The next value of QUOTIENT on each step, by incrementing the current value.
   */
  NEXT_QUOTIENT extends DigitList.DigitList = DigitList._$increment<QUOTIENT>,
  /**
   * The next value of SUM on each step. If this reaches zero, we have reached
   * the end of the division.
   */
  NEXT_REMAINDER extends DigitList.DigitList = DigitList._$subtract<
    REMAINDER,
    B
  >,
  /**
   * Whether or not the divisor is perfectly divisible by the dividend. If so,
   * the remainder is zero and we use the NEXT_QUOTIENT as the result.
   */
  PERFECTLY_DIVISIBLE extends boolean = REMAINDER extends B ? true : false,
  /**
   * Whether or not we have reached the end of the division. If the next
   * remainder value has reached zero, we have reached the end of the division.
   *
   * If the divisor is equal to the dividend, the remainder is zero and we
   * have reached the end of the division as well.
   */
  DONE extends boolean = NEXT_REMAINDER extends [Digit.Zero]
    ? true
    : PERFECTLY_DIVISIBLE,
  /**
   * The result of the division is the quotient and remainder, as a pair.
   */
  DIV_RESULT extends DigitList.DigitList = PERFECTLY_DIVISIBLE extends true
    ? NEXT_QUOTIENT
    : QUOTIENT,
  /**
   * The result of the modulo operation is the remainder.
   */
  MOD_RESULT extends DigitList.DigitList = PERFECTLY_DIVISIBLE extends true
    ? [Digit.Zero]
    : REMAINDER,
  /**
   * The result of the division or modulo operation.
   */
  RESULT extends DigitList.DigitList = OPERATION extends "DIVIDE"
    ? DIV_RESULT
    : MOD_RESULT
> = DONE extends true
  ? RESULT
  : _$divideBySubtraction2<A, B, OPERATION, NEXT_QUOTIENT, NEXT_REMAINDER>;

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

declare abstract class DivideBySubtraction_T<
  A extends DigitList.DigitList
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$divideBySubtraction<A, typeof x>;
}

export declare abstract class DivideBySubtraction extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => DivideBySubtraction_T<typeof x>;
}
