import { Kind, Type } from "..";

export type _$imply<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  false
]
  ? false
  : true;

interface Imply_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$imply<T, typeof x>;
}

export interface Imply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Imply_T<typeof x>;
}
