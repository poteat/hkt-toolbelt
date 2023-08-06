import { $, $N, Kind, Type, List } from "..";

export type _$accumulate<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  X extends List.List,
  O extends Kind._$inputOf<F>,
  M extends Kind._$inputOf<F>[] = [],
  CURR = List._$first<X>,
  REST extends List.List = List._$shift<X>,
  ACC = $N<F, [O, CURR]>,
  RESULT extends Kind._$inputOf<F>[] = X extends []
    ? M
    : ACC extends Kind._$inputOf<F>
    ? _$accumulate<F, REST, ACC, List._$push<ACC, M>>
    : never
> = 0 extends 1 ? never : RESULT;

interface Accumulate_T2<
  F extends Kind.Kind<(x: never) => Kind.Kind>,
  O extends Kind._$inputOf<F>
> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], List.List>): _$accumulate<F, typeof x, O>;
}

interface Accumulate_T<F extends Kind.Kind<(x: never) => Kind.Kind>>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind._$inputOf<F>>
  ): Accumulate_T2<F, typeof x>;
}

export interface Accumulate extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => Kind.Kind>>
  ): Accumulate_T<typeof x>;
}
