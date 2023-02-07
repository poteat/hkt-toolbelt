import { Type, Kind } from "..";

export type _$xnor<T extends boolean, U extends boolean> = T extends U
  ? true
  : false;

interface Xnor_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$xnor<T, typeof x>;
}

export interface Xnor extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Xnor_T<typeof x>;
}
