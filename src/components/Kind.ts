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
        $<Cast<Last, Kind>, Cast<X, InputOf<Cast<Last, Kind>>>>
      >
    : X;

  type _$composablePair<F extends [Kind, Kind]> = Kind.OutputOf<
    F[1]
  > extends Kind.InputOf<F[0]>
    ? true
    : false;

  abstract class ComposablePair extends Kind {
    abstract f: (
      x: Cast<this[Kind._], [Kind, Kind]>
    ) => _$composablePair<typeof x>;
  }

  export type _$composable<FX extends Kind[]> = List._$every<
    Kind.ComposablePair,
    List._$pair<FX>
  >;

  export abstract class Composable extends Kind {
    abstract f: (x: Cast<this[Kind._], Kind[]>) => _$composable<typeof x>;
  }

  export abstract class Compose<
    FX extends _$composable<FX> extends true ? Kind[] : never
  > extends Kind {
    abstract f: (
      x: Cast<this[Kind._], FX extends [] ? unknown : InputOf<List._$last<FX>>>
    ) => _$compose<FX, typeof x>;
  }

  export abstract class Apply<X> extends Kind {
    abstract f: (
      x: Cast<this[Kind._], Kind<(x: X) => unknown>>
    ) => $<typeof x, Cast<X, InputOf<typeof x>>>;
  }

  export type InputOf<F extends Kind> = F extends {
    f: (x: infer X) => unknown;
  }
    ? X
    : unknown;

  export type OutputOf<F extends Kind> = F extends {
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
