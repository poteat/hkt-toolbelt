import { $, Parser2 } from '../..'

export type CommaSeparated = $<
  Parser2.SeparatedBy,
  $<Parser2.Utility.WhitespaceSurrounded, $<Parser2.Literal, ','>>
>
