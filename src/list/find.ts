import { $, Type, Kind } from '..';

export type _$find<F extends Kind.Kind, X extends unknown[]> = X extends [
  infer Head,
  ...infer Tail
]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? Head
    : _$find<F, Tail>
  : never;

interface Find_T<F extends Kind.Kind<(x: never) => boolean>> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>[]>): _$find<F, typeof x>;
}

export interface Find extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Find_T<typeof x>;
}
