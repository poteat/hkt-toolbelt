import { $, Test, Parser2, Stress, List, Function, String } from '..'

type TenXThenY = [...$<List.Pop, Stress.TenTuple>, 'y']
type TenChoices = $<$<List.Map, Parser2.Literal>, TenXThenY>
type TenChoicesParser = $<
  Parser2.Run,
  $<Parser2.Many, $<Parser2.Choice, TenChoices>>
>
type TenY = $<$<List.Map, $<Function.Constant, 'y'>>, $<List.Times, 10>>
type TenYString = $<String.FromList, TenY>

type HundredXThenY = [...$<List.Pop, Stress.HundredTuple>, 'y']
type HundredChoices = $<$<List.Map, Parser2.Literal>, HundredXThenY>
type HundredChoicesParser = $<
  Parser2.Run,
  $<Parser2.Many, $<Parser2.Choice, HundredChoices>>
>
type HundredY = $<$<List.Map, $<Function.Constant, 'y'>>, $<List.Times, 100>>
type HundredYString = $<String.FromList, HundredY>

type ThousandXThenY = [...$<List.Pop, Stress.ThousandTuple>, 'y']
type ThousandChoices = $<$<List.Map, Parser2.Literal>, ThousandXThenY>
type ThousandChoicesParser = $<
  Parser2.Run,
  $<Parser2.Many, $<Parser2.Choice, ThousandChoices>>
>
type ThousandY = $<$<List.Map, $<Function.Constant, 'y'>>, $<List.Times, 1000>>
type ThousandYString = $<String.FromList, ThousandY>

type Many_Choices_Spec = [
  /**
   * Can match if we have ten instances of ten choices.
   */
  Test.Expect<$<TenChoicesParser, TenYString>, TenY>,

  /**
   * Can match if we have a hundred instances of ten choices.
   */
  Test.Expect<$<TenChoicesParser, HundredYString>, HundredY>,

  /**
   * Can match if we have a thousand instances of ten choices.
   */
  Test.Expect<$<TenChoicesParser, ThousandYString>, ThousandY>,

  /**
   * Can match if we have ten instances of a hundred choices.
   */
  Test.Expect<$<HundredChoicesParser, TenYString>, TenY>,

  /**
   * Can match if we have a hundred instances of a hundred choices.
   */
  Test.Expect<$<HundredChoicesParser, HundredYString>, HundredY>,

  /**
   * Can match if we have a thousand instances of a hundred choices.
   */
  Test.Expect<$<HundredChoicesParser, ThousandYString>, ThousandY>,

  /**
   * Can match if we have ten instances of a thousand choices.
   */
  Test.Expect<$<ThousandChoicesParser, TenYString>, TenY>,

  /**
   * Can match if we have a hundred instances of a thousand choices.
   */
  Test.Expect<$<ThousandChoicesParser, HundredYString>, HundredY>

  /**
   * Can match if we have a thousand instances of a thousand choices.
   */
  // (Causes a compiler infinite loop)
  // Test.Expect<$<ThousandChoicesParser, ThousandYString>, ThousandY>
]
