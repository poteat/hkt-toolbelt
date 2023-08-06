import { Type, Kind } from "..";

export type _$unshift<X, T extends unknown[]> = [X, ...T];

interface Unshift_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$unshift<X, typeof x>;
}

export interface Unshift extends Kind.Kind {
  f(x: this[Kind._]): Unshift_T<typeof x>;
}
