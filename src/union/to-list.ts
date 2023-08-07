import { Kind, Union } from '..';

export type _$toList<T, O extends unknown[] = []> = Union._$toIntersection<
  T extends unknown ? (t: T) => T : never
> extends (x: never) => infer X
  ? _$toList<Exclude<T, X>, [X, ...O]>
  : O;

export interface ToList extends Kind.Kind {
  f(x: this[Kind._]): _$toList<this[Kind._]>;
}
