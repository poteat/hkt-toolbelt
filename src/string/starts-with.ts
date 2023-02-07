import { Type, Kind } from "..";

export type _$startsWith<
  Prefix extends string,
  S extends string
> = S extends `${Prefix}${string}` ? true : false;

interface StartsWith_T<Prefix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$startsWith<Prefix, typeof x>;
}

export interface StartsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): StartsWith_T<typeof x>;
}
