import { $, Type, Function, Kind } from "..";

export type _$if<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind,
  X extends Kind._$inputOf<Predicate>
> = $<Predicate, X> extends true
  ? $<Then, Type._$cast<X, Kind._$inputOf<Then>>>
  : $<Else, Type._$cast<X, Kind._$inputOf<Else>>>;

export abstract class If<
  Predicate extends Kind.Kind<(x: never) => boolean>,
  Then extends Kind.Kind,
  Else extends Kind.Kind = Function.Constant<never>
> extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Kind._$inputOf<Predicate>>
  ) => _$if<Predicate, Then, Else, typeof x>;
}
