import { $, Parser2, List, Kind } from '../..'

type _$json = $<
  Kind.Pipe,
  [
    $<
      List.ConcatBy,
      [Parser2.JSON.Boolean, Parser2.JSON.Null, Parser2.JSON.String]
    >,
    Parser2.Choice
  ]
>

type _$nestJSON = $<
  Kind.Pipe,
  [
    Kind.Apply,
    List.Map,
    $<Kind.Apply, [Parser2.JSON.Array, Parser2.JSON.Object]>
  ]
>

type JSON7 = $<_$json, []>

type JSON6 = $<_$json, $<_$nestJSON, JSON7>>

type JSON5 = $<_$json, $<_$nestJSON, JSON6>>

type JSON4 = $<_$json, $<_$nestJSON, JSON5>>

type JSON3 = $<_$json, $<_$nestJSON, JSON4>>

type JSON2 = $<_$json, $<_$nestJSON, JSON3>>

type JSON1 = $<_$json, $<_$nestJSON, JSON2>>

export type JSON = $<_$json, $<_$nestJSON, JSON1>>
