import { Type, Kind, List } from "..";

export type _$concat<U extends unknown, T extends unknown[]> = U extends unknown[] ? [...T, ...U] : List._$push<U, T>

interface Concat_T<U extends unknown> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$concat<U, typeof x>;
}

export interface Concat extends Kind.Kind {
  f(x: this[Kind._]): Concat_T<typeof x>;
}
