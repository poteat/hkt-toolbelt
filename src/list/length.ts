import { Type, Kind } from "..";

export type _$length<T extends unknown[]> = T["length"];

export interface Length extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$length<typeof x>;
}
