import { Type, Kind } from "..";

export type _$length<T extends unknown[]> = T["length"];

export declare abstract class Length extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], unknown[]>) => _$length<typeof x>;
}
