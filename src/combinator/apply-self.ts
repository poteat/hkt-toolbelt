import { $, Type, Kind, Combinator } from "..";

export interface ApplySelf extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Combinator.RecursiveKind>
  ): $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>;
}
