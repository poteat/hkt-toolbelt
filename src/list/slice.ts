import { NaturalNumber, Number, DigitList, Digit, Kind, Type } from "..";

type _$slice2<T extends unknown[], N extends DigitList.DigitList> = 0 extends 1
  ? never
  : T extends [unknown, ...infer Tail]
  ? N extends [Digit.Zero]
    ? T
    : _$slice2<Tail, DigitList._$decrement<N>>
  : [];

export type _$slice<
  T extends unknown[],
  N extends Number.Number
> = Number._$isNatural<N> extends true
  ? _$slice2<T, NaturalNumber._$toList<N>>
  : never;

interface Slice_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$slice<typeof x, N>;
}

export interface Slice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Slice_T<typeof x>;
}
