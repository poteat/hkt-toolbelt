import { Type, Kind } from "..";

export type _$not<T extends boolean> = T extends true ? false : true;

export interface Not extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$not<typeof x>;
}
