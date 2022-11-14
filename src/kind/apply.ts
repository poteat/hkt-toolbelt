import { $, Type, Kind } from "..";

export abstract class Apply<X> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>
  ) => $<
    typeof x,
    Type._$cast<
      X,
      Kind._$inputOf<Type._$cast<this[Kind._], Kind.Kind<(x: X) => unknown>>>
    >
  >;
}
