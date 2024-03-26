import { Kind, Type } from '..'

export type _$atPath<Path extends PropertyKey[], T> = Path extends [
  infer Head,
  ...infer Tail
]
  ? Tail extends []
    ? Head extends keyof T
      ? T[Head]
      : never
    : _$atPath<Type._$cast<Tail, PropertyKey[]>, T[Type._$cast<Head, keyof T>]>
  : never

interface AtPath_T<Path extends PropertyKey[]> extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Record<PropertyKey, unknown>>
  ): _$atPath<Path, typeof x>
}

export interface AtPath extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], PropertyKey[]>): AtPath_T<typeof x>
}
