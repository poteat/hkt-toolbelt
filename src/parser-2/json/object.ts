import { $, Parser2, Object, Kind } from '../..'

type BetweenCurlyBrackets = $<
  $<
    Parser2.Between,
    $<Parser2.Utility.WhitespaceSurrounded, $<Parser2.Literal, '{'>>
  >,
  $<Parser2.Utility.WhitespaceSurrounded, $<Parser2.Literal, '}'>>
>

export type Object = $<
  Kind.Pipe,
  [
    Parser2.JSON.KeyValuePair,
    Parser2.Utility.CommaSeparated,
    BetweenCurlyBrackets,
    Parser2.Map,
    $<Kind.Apply, Object.FromEntries>
  ]
>
