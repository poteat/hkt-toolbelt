import { $, Type, Kind } from '..';

interface Apply_T<X> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>
  ): $<
    typeof x,
    Type._$cast<
      X,
      Kind._$inputOf<Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>>
    >
  >;
}

export interface Apply extends Kind.Kind {
  f(x: this[Kind._]): Apply_T<typeof x>;
}
