import { Kind, Type, Union } from '..';

type _$paths2<T, O extends unknown[] = []> =
  | {
      [K in keyof T]: T[K] extends Record<string, unknown>
        ? _$paths2<T[K], [...O, K]>
        : [...O, K];
    }[keyof T]
  | O;

export type _$paths<T, U = _$paths2<T>> = Union._$toList<
  U extends [] ? never : U
>;

export interface Paths extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<string, unknown>>): _$paths<typeof x>;
}
