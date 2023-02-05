import { Kind, Type } from "..";

export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false;

interface And_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$and<T, typeof x>;
}

export interface And extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): And_T<typeof x>;
}
