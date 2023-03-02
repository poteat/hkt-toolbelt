import { DigitList, Kind, Number, Type, NaturalNumber, Digit, List } from '..';

type _$flattenN2<
  T extends unknown[],
  N extends DigitList.DigitList,
  N_NEXT extends DigitList.DigitList = DigitList._$decrement<N>,
  RESULT extends List.List = N extends [Digit.Zero]
    ? T
    : _$flattenN2<_$flattenShallow<T>, N_NEXT>
> = RESULT;

type _$flattenShallow<
  T extends unknown[],
  RESULT extends List.List = T extends [infer H, ...infer R]
    ? H extends unknown[]
      ? [...H, ..._$flattenShallow<R>]
      : [H, ..._$flattenShallow<R>]
    : []
> = RESULT;

export type _$flattenN<
  T extends unknown[],
  N extends Number.Number,
  RESULT extends List.List = Number._$isNatural<N> extends true 
    ? _$flattenN2<T, NaturalNumber._$toList<N>>
    : never
> = RESULT;

interface FlattenN_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$flattenN<typeof x, N>
}

export interface FlattenN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): FlattenN_T<typeof x>;
}
