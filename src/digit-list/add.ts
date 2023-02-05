import { Digit, DigitList, Kind, Type } from "..";

type _$add2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  CARRY extends Digit.Digit = Digit.Zero,
  OUTPUT extends DigitList.DigitList = [],
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$pop<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$pop<B>,
  SUM extends Digit.Digit = Digit._$add<A_LAST, B_LAST>,
  SUM_TENS extends Digit.Digit = Digit._$addTens<A_LAST, B_LAST>,
  SUM_CARRY extends Digit.Digit = Digit._$add<SUM, CARRY>,
  SUM_CARRY_TENS extends Digit.Digit = Digit._$addTens<SUM, CARRY>,
  CARRY_NEXT extends Digit.Digit = SUM_TENS extends "1" ? "1" : SUM_CARRY_TENS,
  OUTPUT_NEXT extends DigitList.DigitList = [SUM_CARRY, ...OUTPUT],
  DONE = A extends [] ? (B extends [] ? true : false) : false,
  RESULT = CARRY extends "1" ? [CARRY, ...OUTPUT] : OUTPUT
> = DONE extends true
  ? RESULT
  : _$add2<A_NEXT, B_NEXT, CARRY_NEXT, OUTPUT_NEXT>;

export type _$add<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  SUM = _$add2<A, B>,
  RESULT = SUM extends [] ? [Digit.Zero] : SUM
> = RESULT;

interface Add_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$add<X, typeof x>;
}

export interface Add extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Add_T<typeof x>;
}
