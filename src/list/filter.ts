import { $, Type, Kind } from "..";

export type _$filter<
  F extends Kind.Kind,
  X extends unknown[],
  O extends unknown[] = []
> = X extends [infer Head, ...infer Tail]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? _$filter<F, Tail, [...O, Head]>
    : _$filter<F, Tail, O>
  : O;

interface Filter_T<F extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>): _$filter<F, typeof x>;
}

export interface Filter extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Filter_T<typeof x>;
}
