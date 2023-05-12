import { $, Test, Parser2, Stress, List } from '..'

type TenXThenY = [...$<List.Pop, Stress.TenTuple>, 'y']
type TenChoices = $<$<List.Map, Parser2.Literal>, TenXThenY>

type HundredXThenY = [...$<List.Pop, Stress.HundredTuple>, 'y']
type HundredChoices = $<$<List.Map, Parser2.Literal>, HundredXThenY>

type ThousandXThenY = [...$<List.Pop, Stress.ThousandTuple>, 'y']
type ThousandChoices = $<$<List.Map, Parser2.Literal>, ThousandXThenY>

type Choice_Spec = [
  /**
   * Can match if we have ten choices.
   */
  Test.Expect<
    $<
      $<Parser2.Choice, TenChoices>,
      {
        input: 'y'
        result: never
      }
    >,
    {
      input: ''
      result: 'y'
    }
  >,

  /**
   * Can match if we have a hundred choices.
   */
  Test.Expect<
    $<
      $<Parser2.Choice, HundredChoices>,
      {
        input: 'y'
        result: never
      }
    >,
    {
      input: ''
      result: 'y'
    }
  >,

  /**
   * Can match if we have a thousand choices.
   */
  Test.Expect<
    $<
      $<Parser2.Choice, ThousandChoices>,
      {
        input: 'y'
        result: never
      }
    >,
    {
      input: ''
      result: 'y'
    }
  >
]
