import $, { Cast, Function, List } from ".";

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

  export type _$pipe<FX extends Kind[], X> = _$compose<List._$reverse<FX>, X>;

  export abstract class Pipe<
    FX extends _$composable<List._$reverse<FX>> extends true ? Kind[] : never
  > extends Kind {
    abstract f: (
      x: Cast<this[Kind._], FX extends [] ? unknown : InputOf<List._$first<FX>>>
    ) => _$pipe<FX, typeof x>;
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

export const Composable = Kind.Composable;

export type Composable = Kind.Composable;

export const Compose = Kind.Compose;

export type Compose<
  FX extends Kind._$composable<FX> extends true ? Kind[] : never
> = Kind.Compose<FX>;

export const Pipe = Kind.Pipe;

export type Pipe<
  FX extends Kind._$composable<List._$reverse<FX>> extends true ? Kind[] : never
> = Kind.Pipe<FX>;

export const Apply = Kind.Apply;

export type Apply<X> = Kind.Apply<X>;

export type InputOf<F extends Kind> = Kind.InputOf<F>;

export type OutputOf<F extends Kind> = Kind.OutputOf<F>;

declare const Kind_: typeof Kind;

export declare abstract class Kind<F extends Function = Function> {
  abstract readonly [Kind_._]: unknown;
  abstract f: F;
}

export default Kind;
