import { Type, Kind } from '..';

export type _$toLower<S extends string> = Lowercase<S>;

export interface ToLower extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toLower<typeof x>;
}
