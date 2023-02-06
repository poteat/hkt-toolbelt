import { Type, Kind } from "..";

export type _$push<X, T extends unknown[]> = [...T, X];

export interface Push<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$push<X, typeof x>;
}
