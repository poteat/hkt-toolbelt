import { Type, Kind } from "..";

export declare abstract class RecursiveKind extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], RecursiveKind>) => unknown;
}
