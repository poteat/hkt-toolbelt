import { $, Type, Kind } from "..";

export type _$map<F extends Kind.Kind, X extends unknown[]> = {
  [key in keyof X]: $<F, Type._$cast<X[key], Kind._$inputOf<F>>>;
};

export interface Map<F extends Kind.Kind> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$map<F, typeof x>;
}
