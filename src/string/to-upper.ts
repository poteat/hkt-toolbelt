import { Type, Kind } from '..';

export type _$toUpper<S extends string> = Uppercase<S>;

export interface ToUpper extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$toUpper<typeof x>;
}
