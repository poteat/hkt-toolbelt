import { $, Parser2, Kind, Type } from '../..'

type _$escapedCharacterMap = {
  '\\\\': '\\'
  '\\"': '"'
  '\\r': '\r'
  '\\n': '\n'
  '\\t': '\t'
  '\\b': '\b'
  '\\f': '\f'
}

type _$parseEscapedCharacter<S extends string> =
  _$escapedCharacterMap[Type._$cast<S, keyof _$escapedCharacterMap>]

interface ParseEscapedCharacter extends Kind.Kind {
  f(x: Type._$cast<this[Kind._], string>): _$parseEscapedCharacter<typeof x>
}

export type EscapedCharacter = $<
  $<Parser2.Map, $<Parser2.Literal, keyof _$escapedCharacterMap>>,
  ParseEscapedCharacter
>
