import { Type, Kind } from "..";

export type _$or<T extends boolean, U extends boolean> = [T, U] extends [
  false,
  false
]
  ? false
  : true;

export abstract class Or<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$or<T, typeof x>;
}
