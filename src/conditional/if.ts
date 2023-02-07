import { $, Type, Kind } from "..";

export type _$if<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind,
  X extends Kind._$inputOf<Predicate>
> = $<Predicate, X> extends true
  ? $<Then, Type._$cast<X, Kind._$inputOf<Then>>>
  : $<Else, Type._$cast<X, Kind._$inputOf<Else>>>;

export interface If_T3<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind
> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind._$inputOf<Predicate>>
  ): _$if<Predicate, Then, Else, typeof x>;
}

export interface If_T2<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind
> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): If_T3<Predicate, Then, typeof x>;
}

export interface If_T1<Predicate extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind.Kind>): If_T2<Predicate, typeof x>;
}

export interface If extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): If_T1<typeof x>;
}
