import { $, Type, Kind } from "..";
import { RecursiveKind } from "./recursive-kind";

export abstract class ApplySelf extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], RecursiveKind>
  ) => $<typeof x, Type._$cast<typeof x, Kind._$inputOf<typeof x>>>;
}
