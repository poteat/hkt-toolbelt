import { Type, Kind, Number } from "..";

export type _$isInteger<T extends Number.Number> = `${T}` extends `${bigint}`
  ? T extends `0x${string}`
    ? false
    : true
  : false;

export declare abstract class IsInteger extends Kind.Kind {
  abstract f: (
    x: Type._$cast<this[Kind._], Number.Number>
  ) => _$isInteger<typeof x>;
}
