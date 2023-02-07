import { Kind, Type, String, Number, List } from "..";

export type _$slice<
  S extends string,
  N extends Number.Number
> = String._$fromList<List._$slice<String._$toList<S>, N>>;

interface Slice_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$slice<typeof x, N>;
}

export interface Slice extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Slice_T<typeof x>;
}
