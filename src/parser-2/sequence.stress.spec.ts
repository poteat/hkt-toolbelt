import { $, Test, Parser2, Stress, List } from '..'

type TenSequence = $<$<List.Map, Parser2.Literal>, Stress.TenTuple>
type TenSequenceParser = $<Parser2.Run, $<Parser2.Sequence, TenSequence>>

type HundredSequence = $<$<List.Map, Parser2.Literal>, Stress.HundredTuple>
type HundredSequenceParser = $<
  Parser2.Run,
  $<Parser2.Sequence, HundredSequence>
>

type ThousandSequence = $<$<List.Map, Parser2.Literal>, Stress.ThousandTuple>
type ThousandSequenceParser = $<
  Parser2.Run,
  $<Parser2.Sequence, ThousandSequence>
>

type Sequence_Spec = [
  /**
   * Can match if we have a sequence of ten.
   */
  Test.Expect<$<TenSequenceParser, Stress.TenString>, Stress.TenTuple>,

  /**
   * Can match if we have a sequence of a hundred.
   */
  Test.Expect<
    $<HundredSequenceParser, Stress.HundredString>,
    Stress.HundredTuple
  >,

  /**
   * Can match if we have a sequence of a thousand.
   */
  Test.Expect<
    $<ThousandSequenceParser, Stress.ThousandString>,
    Stress.ThousandTuple
  >
]
