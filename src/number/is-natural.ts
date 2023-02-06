import { Number, Type, Kind } from "..";

export type _$isNatural<T extends Number.Number> =
  Number._$isInteger<T> extends true
    ? Number._$sign<T> extends "+"
      ? true
      : false
    : false;

export interface IsNatural extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isNatural<typeof x>;
}
