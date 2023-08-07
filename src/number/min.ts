import { Kind, Type, Number } from '..';

export type _$min<
  A extends Number.Number,
  B extends Number.Number
> = Number._$compare<A, B> extends -1 ? A : B;

interface Min_T<N extends Number.Number> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$min<typeof x, N>;
}

export interface Min extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): Min_T<typeof x>;
}
