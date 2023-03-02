import { Type, Kind, Number, NaturalNumber, DigitList, Digit, List } from "..";

type _$shiftN2<
  T extends unknown[],
  N extends DigitList.DigitList,
  RESULT extends List.List = T extends [unknown, ...infer Tail]
    ? N extends [Digit.Zero]
      ? T
      : _$shiftN2<Tail, DigitList._$decrement<N>>
    : []
> = RESULT;

export type _$shiftN<
  T extends unknown[], 
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true 
    ? _$shiftN2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT;

interface ShiftN_T<N extends Number.Number> extends Kind.Kind {
    f(x: Type._$cast<this[Kind._], unknown[]>): _$shiftN<typeof x, N>;
}

export interface ShiftN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): ShiftN_T<typeof x>;
}
