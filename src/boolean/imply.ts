import { Kind, Type } from "..";

export type _$imply<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  false,
]
  ? false
  : true;

export abstract class Imply<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$imply<T, typeof x>;
}
