import { $, Test, List, Function, String, Parser2 } from '../..'

type TenSpaces = $<$<List.Map, $<Function.Constant, ' '>>, $<List.Times, 10>>
type TenSpaceString = $<String.FromList, TenSpaces>

type HundredSpaces = $<
  $<List.Map, $<Function.Constant, ' '>>,
  $<List.Times, 100>
>
type HundredSpaceString = $<String.FromList, HundredSpaces>

type ThousandSpaces = $<
  $<List.Map, $<Function.Constant, ' '>>,
  $<List.Times, 1000>
>
type ThousandSpaceString = $<String.FromList, ThousandSpaces>

type WhitespaceParser = $<Parser2.Run, Parser2.Utility.OptionalWhitespace>

type OptionalWhitespace_Spec = [
  /**
   * Can match 10 spaces.
   */
  Test.Expect<$<WhitespaceParser, TenSpaceString>, TenSpaceString>,

  /**
   * Can match 100 spaces.
   */
  Test.Expect<$<WhitespaceParser, HundredSpaceString>, HundredSpaceString>,

  /**
   * Can match 1000 spaces.
   */
  Test.Expect<$<WhitespaceParser, ThousandSpaceString>, ThousandSpaceString>
]
