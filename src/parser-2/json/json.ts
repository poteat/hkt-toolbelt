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

type JSON3 = $<_$json, []>
type Array3 = $<Parser2.JSON.Array, JSON3>
type Object3 = $<Parser2.JSON.Object, JSON3>

type JSON2 = $<_$json, [Array3, Object3]>
type Array2 = $<Parser2.JSON.Array, JSON2>
type Object2 = $<Parser2.JSON.Object, JSON2>

type JSON1 = $<_$json, [Array2, Object2]>
type Array1 = $<Parser2.JSON.Array, JSON1>
type Object1 = $<Parser2.JSON.Object, JSON1>

export type JSON = $<_$json, [Array1, Object1]>
