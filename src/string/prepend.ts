import { Type, Kind } from "..";

export type _$prepend<
  Prefix extends string,
  S extends string
> = `${Prefix}${S}`;

export interface Prepend<Prefix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$prepend<Prefix, typeof x>;
}
