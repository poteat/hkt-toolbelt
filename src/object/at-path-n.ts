import { Kind, Type } from '..'
import { _$atPath } from './at-path'

export type KeyOrPath = PropertyKey | PropertyKey[]

export type _$atPathN<
  Path extends KeyOrPath[],
  T,
  Acc extends any[] = [],
  Output = Path extends [
    infer Head extends KeyOrPath,
    ...infer Tail extends KeyOrPath[]
  ]
    ? _$atPathN<
        Tail,
        T,
        [
          ...Acc,
          Head extends PropertyKey[]
            ? _$atPath<Head, T>
            : T[Type._$cast<Head, keyof T>]
        ]
      >
    : Acc[number]
> = Output

interface AtPathN_T<Path extends KeyOrPath[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<string, unknown>>
  ): _$atPathN<Path, typeof x>
}

export interface AtPathN extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], KeyOrPath[]>): AtPathN_T<typeof x>
}
