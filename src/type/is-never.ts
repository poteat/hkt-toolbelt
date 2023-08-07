import { Conditional, Kind } from '..';

export type _$isNever<X> = Conditional._$equals<X, never>;

export interface IsNever extends Kind.Kind {
  f(x: this[Kind._]): _$isNever<typeof x>;
}
