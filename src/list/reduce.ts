import { $, Kind, Type, Function } from "..";

export type _$reduce<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  X extends unknown[],
  O
> = 1 extends 0
  ? never
  : X extends [infer H, ...infer T]
  ? $<
      $<F, Type._$cast<O, Kind._$inputOf<F>>>,
      Type._$cast<
        H,
        Kind._$inputOf<
          Function._$returnType<
            (F & { readonly [Kind._]: Type._$cast<O, Kind._$inputOf<F>> })["f"]
          >
        >
      >
    > extends infer R
    ? _$reduce<F, T, R>
    : never
  : O;

interface Reduce_T2<F extends Kind.Kind<(x: never) => Kind.Kind>, X>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$reduce<F, typeof x, X>;
}

interface Reduce_T<F extends Kind.Kind<(x: never) => Kind.Kind>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): Reduce_T2<F, typeof x>;
}

export interface Reduce extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => Kind.Kind>>
  ): Reduce_T<typeof x>;
}
