import { Type, Kind, Digit, DigitList } from "..";

export type _$multiply2<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList,
  SCALE extends DigitList.DigitList = [],
  SUM extends DigitList.DigitList = [],
  LAST_B extends Digit.Digit = DigitList._$last<B>,
  POP_B extends DigitList.DigitList = DigitList._$pop<B>,
  MUL extends DigitList.DigitList = DigitList._$multiplyDigit<A, LAST_B>,
  MUL_SCALE extends DigitList.DigitList = [...MUL, ...SCALE],
  ADD extends DigitList.DigitList = DigitList._$add<SUM, MUL_SCALE>,
  NEXT_SCALE extends DigitList.DigitList = [Digit.Zero, ...SCALE]
> = B extends [] ? SUM : _$multiply2<A, POP_B, NEXT_SCALE, ADD>;

export type _$multiply<
  A extends DigitList.DigitList,
  B extends DigitList.DigitList
> = Type._$cast<_$multiply2<A, B>, DigitList.DigitList>;

export declare abstract class Multiply_T<
  T extends DigitList.DigitList
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => _$multiply<typeof x, T>;
}

export declare abstract class Multiply extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], DigitList.DigitList>
  ) => Multiply_T<typeof x>;
}
