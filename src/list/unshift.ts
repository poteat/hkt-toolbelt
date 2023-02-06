import { Type, Kind } from "..";

export type _$unshift<X, T extends unknown[]> = [X, ...T];

export interface Unshift<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unshift<X, typeof x>;
}
