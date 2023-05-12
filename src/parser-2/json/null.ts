import { $, Parser2, Kind, Type } from '../..'

type _$parseNull<S extends string> = S extends 'null' ? null : never

interface ParseNull extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$parseNull<typeof x>
}

export type Null = $<$<Parser2.Map, $<Parser2.Literal, 'null'>>, ParseNull>
