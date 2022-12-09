import { $, Type, Kind, Combinator } from "..";

export abstract class ApplySelf extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Combinator.RecursiveKind>
  ) => $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>;
}
