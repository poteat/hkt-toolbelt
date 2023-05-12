import { $, Parser2, String } from '../..'

type DoubleQuotes = $<Parser2.Literal, '"'>

type BetweenDoubleQuotes = $<$<Parser2.Between, DoubleQuotes>, DoubleQuotes>

type AnyCharExceptDoubleQuotes = $<Parser2.AnyCharExcept, DoubleQuotes>

type StringChar = $<
  Parser2.Choice,
  [Parser2.JSON.EscapedCharacter, AnyCharExceptDoubleQuotes]
>

type StringContents = $<Parser2.Many, StringChar>

export type String = $<
  $<Parser2.Map, $<BetweenDoubleQuotes, StringContents>>,
  String.FromList
>
