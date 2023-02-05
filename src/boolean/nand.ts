import { Type, Kind } from "..";

export type _$nand<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? false
  : true;

interface Nand_T<T extends boolean> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): _$nand<T, typeof x>;
}

export interface Nand extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], boolean>): Nand_T<typeof x>;
}
