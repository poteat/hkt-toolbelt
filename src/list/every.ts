import { $, Boolean, Type, Kind } from '..';

export type _$every<
  F extends Kind.Kind<(x: never) => boolean>,
  T extends unknown[],
  O extends boolean = true
> = T extends [infer Head, ...infer Rest]
  ? _$every<
      F,
      Rest,
      Boolean._$and<O, $<F, Type._$cast<Head, Kind._$inputOf<F>>>>
    >
  : O;

interface Every_T<F extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>): _$every<F, typeof x>;
}

export interface Every extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Every_T<typeof x>;
}
