import { Type, Kind } from "..";

export type _$nor<T extends boolean, U extends boolean> = [T, U] extends [
  false,
  false,
] ? true 
  : false;

export abstract class Nor<T extends boolean> extends Kind.Kind {
  abstract f: (x: Type._$cast<this[Kind._], boolean>) => _$nor<T, typeof x>;
}
