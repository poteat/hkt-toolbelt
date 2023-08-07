import { Type, Kind } from '..'

export type _$first<T extends unknown[]> = T extends [] ? never : T[0]

export interface First extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$first<typeof x>
}
