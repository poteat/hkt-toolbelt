import { Kind, Type } from "..";

export type _$nimply<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  false,
]
  ? true
  : false;

export abstract class Nimply<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$nimply<T, typeof x>;
}
