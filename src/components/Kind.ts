import $, { Cast, Function, String } from "hkt-toolbelt";

export declare namespace Kind {
  const _: unique symbol;

  export type _ = typeof _;

  export type _$compose<FX extends Kind[], X> = FX extends [
    ...infer Init,
    infer Last
  ]
    ? _$compose<
        Cast<Init, Kind[]>,
        $<Cast<Last, Kind>, Cast<X, ParameterOf<Cast<Last, Kind>>>>
      >
    : X;

  export abstract class Compose<FX extends Kind[]> extends Kind {
    abstract f: (x: this[Kind._]) => _$compose<FX, typeof x>;
  }

  export abstract class Apply<X> extends Kind {
    abstract f: (
      x: Cast<this[Kind._], Kind<(x: X) => unknown>>
    ) => $<typeof x, Cast<X, ParameterOf<typeof x>>>;
  }

  export type ParameterOf<F extends Kind> = F extends {
    f: (x: infer X) => unknown;
  }
    ? X
    : unknown;
}

declare const Kind2: typeof Kind;

export declare abstract class Kind<F extends Function = Function> {
  abstract readonly [Kind2._]: unknown;
  abstract f: F;
}

export default Kind;
