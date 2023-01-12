import { Type, Kind } from "..";

export type _$nand<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true,
]
  ? false
  : true;

export abstract class Nand<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$nand<T, typeof x>;
}
