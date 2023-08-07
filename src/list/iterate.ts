import { $, Type, Kind, Number, Function, List, NaturalNumber } from '..';

export type _$iterate<
  F extends Kind.Kind,
  O extends Kind._$inputOf<F>,
  N extends Number.Number,
  COUNT extends Number.Number = NaturalNumber._$decrement<N>,
  M extends Kind._$inputOf<F>[] = [O],
  CURR extends Kind._$inputOf<F> = O,
  ACC = $<F, CURR>,
  RESULT extends Kind._$inputOf<F>[] = COUNT extends 0
    ? M
    : ACC extends Kind._$inputOf<F>
    ? _$iterate<
        F,
        O,
        N,
        NaturalNumber._$decrement<COUNT>,
        List._$push<ACC, M>,
        ACC
      >
    : never
> = 0 extends 1 ? never : RESULT;

interface Iterate_T2<F extends Kind.Kind, N extends Number.Number>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<F>>): _$iterate<F, typeof x, N>;
}

interface Iterate_T<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Iterate_T2<F, typeof x>;
}

export interface Iterate extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): Iterate_T<typeof x>;
}
