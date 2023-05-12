import { $, Parser2, List, Kind } from '../..'

type KeyValueSeparator = $<
  Parser2.Utility.WhitespaceSurrounded,
  $<Parser2.Literal, ':'>
>

export type KeyValuePair = $<
  Kind.Pipe,
  [
    $<List.PushBy, [Parser2.JSON.String, KeyValueSeparator]>,
    Parser2.Sequence,
    Parser2.Utility.WhitespaceSurrounded,
    Parser2.Map,
    $<Kind.Apply, $<$<List.Splice, [1, 1]>, []>>
  ]
>
