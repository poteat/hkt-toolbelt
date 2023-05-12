import { Type, Kind } from '..'

export type _$pushBy<X, T extends unknown[]> = [...T, X]

interface PushBy_T<T extends unknown[]> extends Kind.Kind {
  f(x: this[Kind._]): _$pushBy<typeof x, T>
}

export interface PushBy extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): PushBy_T<typeof x>
}
