import { Type, Kind, Number } from "..";

export type _$isInteger<T extends Number.Number> = `${T}` extends `${bigint}`
  ? T extends `0x${string}`
    ? false
    : true
  : false;

export interface IsInteger extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$isInteger<typeof x>;
}
