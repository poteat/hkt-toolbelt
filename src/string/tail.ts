import { Type, Kind } from '..'

export type _$tail<S extends string> = S extends `${string}${infer Tail}`
  ? Tail extends ''
    ? S
    : Tail
  : string extends S
  ? S
  : ''

export interface Tail extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$tail<typeof x>
}
