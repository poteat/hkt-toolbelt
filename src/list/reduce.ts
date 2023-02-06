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

export interface Reduce<F extends Kind.Kind<(x: never) => Kind.Kind>, O>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$reduce<F, typeof x, O>;
}
