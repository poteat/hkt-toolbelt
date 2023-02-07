import { Type, Kind } from "..";

export type _$nor<T extends boolean, U extends boolean> = [T, U] extends [
  false,
  false
]
  ? true
  : false;

interface Nor_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$nor<T, typeof x>;
}

export interface Nor extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Nor_T<typeof x>;
}
