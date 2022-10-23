import $, { Cast, Function, List } from "hkt-toolbelt";

export declare namespace Kind {
  const _: unique symbol;

  export type _ = typeof _;

  export type _$compose<FX extends Kind[], X> = FX extends [
    ...infer Init,
    infer Last
  ]
    ? _$compose<
        Cast<Init, Kind[]>,
        $<Cast<Last, Kind>, Cast<X, Input<Cast<Last, Kind>>>>
      >
    : X;

  export type _$composable<
    F extends Kind,
    G extends Kind
  > = Kind.Output<G> extends Kind.Input<F> ? true : false;

  export abstract class Compose<FX extends Kind[]> extends Kind {
    abstract f: (
      x: Cast<this[Kind._], FX extends [] ? unknown : Input<List._$last<FX>>>
    ) => _$compose<FX, typeof x>;
  }

  export abstract class Apply<X> extends Kind {
    abstract f: (
      x: Cast<this[Kind._], Kind<(x: X) => unknown>>
    ) => $<typeof x, Cast<X, Input<typeof x>>>;
  }

  export type Input<F extends Kind> = F extends {
    f: (x: infer X) => unknown;
  }
    ? X
    : unknown;

  export type Output<F extends Kind> = F extends {
    f: (x: never) => infer X;
  }
    ? X
    : unknown;
}

declare const Kind_: typeof Kind;

export declare abstract class Kind<F extends Function = Function> {
  abstract readonly [Kind_._]: unknown;
  abstract f: F;
}

export default Kind;
