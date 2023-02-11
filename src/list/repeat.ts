import { Kind, Type, DigitList, Number, List, NaturalNumber } from "..";

type _$repeat2<
  FILL_TYPE extends unknown,
  COUNTER extends DigitList.DigitList,
  STATE extends List.List = [],
  STATE_LENGTH extends DigitList.DigitList = NaturalNumber._$toList<STATE["length"]>,
  RESULT extends List.List = DigitList._$compare<STATE_LENGTH, COUNTER> extends 0
    ? STATE
    : _$repeat2<FILL_TYPE, COUNTER, List._$push<FILL_TYPE, STATE>>
> = RESULT;

export type _$repeat<
  T extends unknown, 
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true 
    ? _$repeat2<T, NaturalNumber._$toList<N>> 
    : never
> = RESULT;

interface Repeat_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): _$repeat<typeof x, N>;
}

export interface Repeat extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Repeat_T<typeof x>;
}
