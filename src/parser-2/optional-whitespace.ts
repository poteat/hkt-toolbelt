import { $, Parser2, Kind, Type, String } from '..'

type WhitespaceCharacter = ' ' | '\n' | '\t'

// type WhitespaceParser = $<
//   Parser2.Map<String.FromList, $<Parser2.Char, WhitespaceCharacter>>
// >

type WhitespaceParser = $<
  $<Parser2.Map, String.FromList>,
  $<Parser2.Many, $<Parser2.Char, WhitespaceCharacter>>
>

// type WhitespaceParser = $<Parser2.Char, WhitespaceCharacter>

export type _$optionalWhitespace<
  /**
   * The state of the parser.
   */
  STATE extends Parser2._$state
> = $<WhitespaceParser, STATE>

export interface OptionalWhitespace extends Kind.Kind {
  f(
    x: Type._$cast<this[Kind._], Parser2._$state>
  ): _$optionalWhitespace<typeof x>
}
