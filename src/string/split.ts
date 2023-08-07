import { Type, Kind, String } from '..'

export type _$split<
  S extends string,
  Delimiter extends string = '',
  O extends unknown[] = []
> = String._$isTemplate<Delimiter> extends true
  ? string[]
  : string extends Delimiter
  ? string[]
  : S extends `${infer Head}${Delimiter}${infer Tail}`
  ? _$split<Tail, Delimiter, [...O, Head]>
  : S extends Delimiter
  ? O
  : [...O, S]

interface Split_T<Delimiter extends string> extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$split<typeof x, Delimiter>
}

export interface Split extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): Split_T<typeof x>
}
