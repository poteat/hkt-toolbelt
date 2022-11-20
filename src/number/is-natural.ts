import { Number, Type, Kind } from "..";

export type _$isNatural<T extends Number.Number> =
  Number._$isInteger<T> extends true
    ? Number._$sign<T> extends "+"
      ? true
      : false
    : false;

export declare abstract class IsNatural extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => _$isNatural<typeof x>;
}
