import { Kind, Type } from "..";

export type _$and<T extends boolean, U extends boolean> = [T, U] extends [
  true,
  true
]
  ? true
  : false;

export abstract class And<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$and<T, typeof x>;
}
