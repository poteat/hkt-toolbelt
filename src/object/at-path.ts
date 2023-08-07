import { Kind, Type } from '..';

export type _$atPath<Path extends (string | symbol)[], T> = Path extends [
  infer Head,
  ...infer Tail
]
  ? Tail extends []
    ? Head extends keyof T
      ? T[Head]
      : never
    : _$atPath<
        Type._$cast<Tail, (string | symbol)[]>,
        T[Type._$cast<Head, keyof T>]
      >
  : never;

interface AtPath_T<Path extends (string | symbol)[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$atPath<Path, typeof x>;
}

export interface AtPath extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], (string | symbol)[]>): AtPath_T<typeof x>;
}
