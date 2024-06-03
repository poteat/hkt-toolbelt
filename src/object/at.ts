import { Kind, Type } from '..'

export type _$at<
  K extends keyof T,
  T extends Record<PropertyKey, unknown>
> = T[K]

interface At_T<K extends PropertyKey> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Record<K, unknown>>): _$at<K, typeof x>
}

export interface At extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey>): At_T<typeof x>
}
