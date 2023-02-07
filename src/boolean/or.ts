import { Type, Kind } from "..";

export type _$or<T extends boolean, U extends boolean> = [T, U] extends [
  false,
  false
]
  ? false
  : true;

interface Or_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$or<T, typeof x>;
}

export interface Or extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Or_T<typeof x>;
}
