import { Type, Kind } from '..'

export type _$prepend<Prefix extends string, S extends string> = `${Prefix}${S}`

interface Prepend_T<T extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$prepend<T, typeof x>
}

export interface Prepend extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Prepend_T<typeof x>
}
