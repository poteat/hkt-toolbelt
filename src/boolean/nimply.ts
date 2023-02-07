import { Kind, Type } from "..";

export type _$nimply<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  false
]
  ? true
  : false;

interface Nimply_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$nimply<T, typeof x>;
}

export interface Nimply extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Nimply_T<typeof x>;
}
