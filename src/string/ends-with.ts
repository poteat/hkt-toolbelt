import { Type, Kind } from "..";

export type _$endsWith<
  Suffix extends string,
  S extends string
> = S extends `${string}${Suffix}` ? true : false;

export interface EndsWith<Suffix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$endsWith<Suffix, typeof x>;
}
