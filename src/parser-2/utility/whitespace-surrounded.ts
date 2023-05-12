import { $, Parser2 } from '../..'

export type WhitespaceSurrounded = $<
  $<Parser2.Between, Parser2.Utility.OptionalWhitespace>,
  Parser2.Utility.OptionalWhitespace
>
