import { Kind, Type, DigitList, Number, List, NaturalNumber } from '..';

type _$times2<
  COUNTER extends DigitList.DigitList,
  STATE extends List.List = [],
  DEC extends DigitList.DigitList = DigitList._$decrement<COUNTER>,
  DEC_STR extends string = DigitList._$toString<DEC>,
  DEC_NUM extends Number.Number = Number._$fromString<DEC_STR>
> = 0 extends 1
  ? never
  : COUNTER extends ['0']
  ? STATE
  : _$times2<DEC, [DEC_NUM, ...STATE]>;

export type _$times<N extends Number.Number> = _$times2<
  NaturalNumber._$toList<N>
>;

export interface Times extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Number.Number>
  ): Number._$isNatural<typeof x> extends true ? _$times<typeof x> : never;
}
