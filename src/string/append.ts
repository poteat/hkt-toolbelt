import { Type, Kind } from '..';

export type _$append<Suffix extends string, S extends string> = `${S}${Suffix}`;

interface Append_T<Suffix extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$append<Suffix, typeof x>;
}

export interface Append extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Append_T<typeof x>;
}
