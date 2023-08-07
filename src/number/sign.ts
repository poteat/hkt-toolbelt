import { Type, Kind, Number } from '..'

export type _$sign<T extends Number.Number> = number extends T
  ? '+' | '-'
  : `${T}` extends `-${string}`
  ? '-'
  : '+'

export interface Sign extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], Number.Number>): _$sign<typeof x>
}
