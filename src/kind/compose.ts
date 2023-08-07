import { $, Type, List, Kind } from '..';

export type _$compose<FX extends Kind.Kind[], X> = FX extends [
  ...infer Init,
  infer Last
]
  ? _$compose<
      Type._$cast<Init, Kind.Kind[]>,
      $<
        Type._$cast<Last, Kind.Kind>,
        Type._$cast<X, Kind._$inputOf<Type._$cast<Last, Kind.Kind>>>
      >
    >
  : X;

interface Compose_T<FX extends Kind.Kind[]> extends Kind.Kind {
  f(
    x: Type._$cast<
      this[Kind._],
      FX extends [] ? unknown : Kind._$inputOf<List._$last<FX>>
    >
  ): _$compose<FX, typeof x>;
}

export interface Compose extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind[]>
  ): Kind._$composable<typeof x> extends true ? Compose_T<typeof x> : never;
}
