import { Type, Kind } from '..'

export type _$endsWith<
  Suffix extends string,
  S extends string
> = S extends `${string}${Suffix}` ? true : false

interface EndsWith_T<T extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$endsWith<T, typeof x>
}

export interface EndsWith extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): EndsWith_T<typeof x>
}
