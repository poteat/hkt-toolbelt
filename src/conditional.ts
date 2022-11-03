import $, { Cast, Function, Kind } from ".";

export type _$equals<T, U> = [T, U] extends [U, T] ? true : false;

export abstract class Equals<T> extends Kind {
  abstract f: (x: this[Kind._]) => _$equals<T, typeof x>;
}

export type _$extends<Super, X> = (X extends unknown ? X : never) extends Super
  ? true
  : false;

export abstract class Extends<Super> extends Kind {
  abstract f: (x: this[Kind._]) => _$extends<Super, typeof x>;
}

/**
 * @alias `Extends<T>`
 * @deprecated
 */
export abstract class SubtypeOf<Super> extends Kind {
  abstract f: (x: this[Kind._]) => _$extends<Super, typeof x>;
}

export type _$if<
  Predicate extends Kind<(x: never) => boolean>,
  Then extends Kind,
  Else extends Kind,
  X extends Kind.InputOf<Predicate>
> = $<Predicate, X> extends true
  ? $<Then, Cast<X, Kind.InputOf<Then>>>
  : $<Else, Cast<X, Kind.InputOf<Else>>>;

export abstract class If<
  Predicate extends Kind<(x: never) => boolean>,
  Then extends Kind,
  Else extends Kind = Function.Constant<never>
> extends Kind {
  abstract f: (
    x: Cast<this[Kind._], Kind.InputOf<Predicate>>
  ) => _$if<Predicate, Then, Else, typeof x>;
}

export * as Conditional from "./conditional";
