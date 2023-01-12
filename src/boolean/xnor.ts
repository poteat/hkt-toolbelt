import { Type, Kind } from "..";

export type _$xnor<T extends boolean, U extends boolean> = T extends U ? true : false;

export abstract class Xnor<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$xnor<T, typeof x>;
}
