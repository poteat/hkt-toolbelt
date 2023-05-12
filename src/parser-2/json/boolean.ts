import { $, Parser2, Kind, Type } from '../..'

type _$parseBoolean<S extends string> = S extends 'true' ? true : false

interface ParseBoolean extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$parseBoolean<typeof x>
}

export type Boolean = $<
  $<Parser2.Map, $<Parser2.Literal, 'true' | 'false'>>,
  ParseBoolean
>
