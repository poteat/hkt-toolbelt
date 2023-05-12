import { $, Parser2, Kind } from '../..'

type BetweenSquareBrackets = $<
  $<
    Parser2.Between,
    $<Parser2.Utility.WhitespaceSurrounded, $<Parser2.Literal, '['>>
  >,
  $<Parser2.Utility.WhitespaceSurrounded, $<Parser2.Literal, ']'>>
>

export type Array = $<
  Kind.Pipe,
  [Parser2.Utility.CommaSeparated, BetweenSquareBrackets]
>
