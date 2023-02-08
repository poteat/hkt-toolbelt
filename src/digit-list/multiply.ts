import { Type, Kind, Digit, DigitList } from "..";

export type _$multiply2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  SCALE extends DigitList.DigitList = [],
  SUM extends DigitList.DigitList = [],
  LAST_A extends Digit.Digit = DigitList._$last<A>,
  POP_A extends DigitList.DigitList = DigitList._$pop<A>,
  MUL extends DigitList.DigitList = DigitList._$multiplyDigit<B, LAST_A>,
  MUL_SCALE extends DigitList.DigitList = [...MUL, ...SCALE],
  ADD extends DigitList.DigitList = DigitList._$add<SUM, MUL_SCALE>,
  NEXT_SCALE extends DigitList.DigitList = [Digit.Zero, ...SCALE],
  DONE extends boolean = A extends [] ? true : false
> = DONE extends true ? SUM : _$multiply2<POP_A, B, NEXT_SCALE, ADD>;

export type _$multiply<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = DigitList._$trim<Type._$cast<_$multiply2<A, B>, DigitList.DigitList>>;

export interface Multiply_T<T extends DigitList.DigitList> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): _$multiply<typeof x, T>;
}

export interface Multiply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], DigitList.DigitList>): Multiply_T<typeof x>;
}
