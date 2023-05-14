import { $, Parser2, List, Kind } from '../..'

type _$json = $<
  Kind.Pipe,
  [
    Kind.Apply,
    List.Map,
    $<Kind.Apply, [Parser2.JSON.Array, Parser2.JSON.Object]>,
    $<
      List.ConcatBy,
      [Parser2.JSON.Boolean, Parser2.JSON.Null, Parser2.JSON.String]
    >,
    Parser2.Choice
  ]
>

type JSON7 = $<_$json, []>

type JSON6 = $<_$json, JSON7>

type JSON5 = $<_$json, JSON6>

type JSON4 = $<_$json, JSON5>

type JSON3 = $<_$json, JSON4>

type JSON2 = $<_$json, JSON3>

type JSON1 = $<_$json, JSON2>

export type JSON = $<_$json, JSON1>
