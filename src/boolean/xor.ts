import { Type, Kind } from "..";

export type _$xor<T extends boolean, U extends boolean> = T extends U ? false : true;

export abstract class Xor<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$xor<T, typeof x>;
}
