import { Digit, DigitList, Kind, Type } from "..";

type _$subtract2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  CARRY extends Digit.Digit = "0",
  OUTPUT extends DigitList.DigitList = [],
  A_LAST extends Digit.Digit = DigitList._$last<A>,
  B_LAST extends Digit.Digit = DigitList._$last<B>,
  A_NEXT extends DigitList.DigitList = DigitList._$pop<A>,
  B_NEXT extends DigitList.DigitList = DigitList._$pop<B>,
  SUB extends Digit.Digit = Digit._$subtract<A_LAST, B_LAST>,
  SUB_TENS extends Digit.Digit = Digit._$subtractTens<A_LAST, B_LAST>,
  SUB_CARRY extends Digit.Digit = Digit._$subtract<SUB, CARRY>,
  SUB_CARRY_TENS extends Digit.Digit = Digit._$subtractTens<SUB, SUB_CARRY>,
  CARRY_NEXT extends Digit.Digit = SUB_TENS extends "1" ? "1" : SUB_CARRY_TENS,
  OUTPUT_NEXT extends DigitList.DigitList = [SUB_CARRY, ...OUTPUT],
  DONE = A extends [] ? (B extends [] ? true : false) : false,
  RESULT = CARRY extends "1" ? ["0"] : OUTPUT
> = DONE extends true
  ? RESULT
  : _$subtract2<A_NEXT, B_NEXT, CARRY_NEXT, OUTPUT_NEXT>;

export type _$subtract<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$trim<_$subtract2<A, B>>;

interface Subtract_T<X extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$subtract<X, typeof x>;
}

export interface Subtract extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Subtract_T<typeof x>;
}
