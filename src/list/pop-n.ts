import { Type, Kind, Number, NaturalNumber, DigitList, List, Digit } from '..';

type _$popN2<
  T extends unknown[],
  N extends DigitList.DigitList,
  RESULT extends List.List = T extends [...infer Head, unknown]
    ? N extends [Digit.Zero]
      ? T
      : _$popN2<Head, DigitList._$decrement<N>>
    : []
> = RESULT;

export type _$popN<
  T extends unknown[],
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true
    ? _$popN2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT;

interface PopN_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$popN<typeof x, N>;
}

export interface PopN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): PopN_T<typeof x>;
}
