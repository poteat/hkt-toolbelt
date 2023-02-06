import { Type, Kind } from "..";

export type _$append<Suffix extends string, S extends string> = `${S}${Suffix}`;

export interface Append<Suffix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$append<Suffix, typeof x>;
}
