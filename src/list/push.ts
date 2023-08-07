import { Type, Kind } from '..';

export type _$push<X, T extends unknown[]> = [...T, X];

interface Push_T<X> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$push<X, typeof x>;
}

export interface Push extends Kind.Kind {
  f(x: this[Kind._]): Push_T<typeof x>;
}
