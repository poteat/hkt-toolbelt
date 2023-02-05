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

export interface DivideBySubtraction extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ): DivideBySubtraction_T<typeof x>;
}
