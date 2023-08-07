import { Type, Kind } from '..'

export type _$isVariadic<T extends unknown[]> = number extends T['length']
  ? true
  : false

export interface IsVariadic extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], unknown[]>): _$isVariadic<typeof x>
}
