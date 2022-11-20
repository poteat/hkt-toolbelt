import { Number, Kind, Type } from "..";

export type _$isFractional<
  T extends Number.Number,
  IS_INTEGER = Number._$isInteger<T>
> = number extends T ? false : IS_INTEGER extends true ? false : true;

export declare abstract class IsFractional extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => _$isFractional<typeof x>;
}
