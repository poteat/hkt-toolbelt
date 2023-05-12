import { $, Parser2, String } from '../..'

type WhitespaceCharacter = ' ' | '\n' | '\t'

export type OptionalWhitespace = $<
  $<Parser2.Map, $<Parser2.Many, $<Parser2.Char, WhitespaceCharacter>>>,
  String.FromList
>
