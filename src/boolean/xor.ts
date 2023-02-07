import { Type, Kind } from "..";

export type _$xor<T extends boolean, U extends boolean> = T extends U
  ? false
  : true;

interface Xor_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$xor<T, typeof x>;
}

export interface Xor extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Xor_T<typeof x>;
}
