import { Kind, Type, Digit, DigitList } from "..";

type _$multiplyDigit2<
  A extends DigitList.DigitList,
  B extends Digit.Digit,
  CARRY extends Digit.Digit = "0",
  OUT extends DigitList.DigitList = [],
  LAST_A extends Digit.Digit = DigitList._$last<A>,
  POP_A extends DigitList.DigitList = DigitList._$pop<A>,
  MUL_ONE extends Digit.Digit = Digit._$multiply<LAST_A, B>,
  MUL_TEN extends Digit.Digit = Digit._$multiplyTens<LAST_A, B>,
  MUL_CARRY_ONE extends Digit.Digit = Digit._$add<MUL_ONE, CARRY>,
  MUL_CARRY_TEN extends Digit.Digit = Digit._$addTens<MUL_ONE, CARRY>,
  NEXT_CARRY extends Digit.Digit = Digit._$add<MUL_TEN, MUL_CARRY_TEN>,
  NEXT_OUT extends DigitList.DigitList = [MUL_CARRY_ONE, ...OUT],
  RESULT extends DigitList.DigitList = CARRY extends "0" ? OUT : [CARRY, ...OUT]
> = A extends [] ? RESULT : _$multiplyDigit2<POP_A, B, NEXT_CARRY, NEXT_OUT>;

export type _$multiplyDigit<
  A extends DigitList.DigitList,
  B extends Digit.Digit
> = B extends "0" ? ["0"] : _$multiplyDigit2<A, B>;

export interface MultiplyDigit_T<T extends Digit.Digit> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ): _$multiplyDigit<typeof x, T>;
}

export interface MultiplyDigit extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Digit.Digit>): MultiplyDigit_T<typeof x>;
}
