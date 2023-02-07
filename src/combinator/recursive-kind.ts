import { Type, Kind } from "..";

export interface RecursiveKind extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], RecursiveKind>): unknown;
}
