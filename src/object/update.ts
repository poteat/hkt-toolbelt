import { Kind, Type } from '..'

export type _$update<
  P extends PropertyKey[],
  V extends unknown,
  A extends Record<string, unknown>,
  Output = Type._$display<{
    [K in keyof A]: P extends [PropertyKey]
      ? P[0] extends K
        ? V
        : A[K]
      : A[K] extends Record<PropertyKey, unknown>
        ? _$update<RemoveItem<P, K>, V, A[K]>
        : A[K]
  }>
> = Output

type RemoveItem<T extends any[], U> = T extends [infer Head, ...infer Tail]
  ? Head extends U
    ? Tail
    : [Head, ...RemoveItem<Tail, U>]
  : T

interface Update_T2<PATHS extends PropertyKey[], VALUE extends unknown>
  extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$update<PATHS, VALUE, typeof x>
}

interface Update_T<PATHS extends PropertyKey[]> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown>): Update_T2<PATHS, typeof x>
}

export interface Update extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): Update_T<typeof x>
}
