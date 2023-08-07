import { $, Type, Kind } from '..'

export type _$includes<F extends Kind.Kind, X extends unknown[]> = X extends [
  infer Head,
  ...infer Tail
]
  ? $<F, Type._$cast<Head, Kind._$inputOf<F>>> extends true
    ? true
    : _$includes<F, Tail>
  : false

interface Includes_T<T extends Kind.Kind<(x: never) => boolean>>
  extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Kind._$inputOf<T>[]>): _$includes<T, typeof x>
}

export interface Includes extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Kind.Kind<(x: never) => boolean>>
  ): Includes_T<typeof x>
}
