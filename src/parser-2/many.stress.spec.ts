import { $, Test, Parser2, Stress } from '..'

type MyAParser = $<Parser2.Run, $<Parser2.Many, $<Parser2.Literal, 'x'>>>

type Literal_Spec = [
  /**
   * Can match a parser ten times.
   */
  Test.Expect<$<MyAParser, Stress.TenString>, Stress.TenTuple>,

  /**
   * Can match a parser a hundred times.
   */
  Test.Expect<$<MyAParser, Stress.HundredString>, Stress.HundredTuple>,

  /**
   * Can match a parser a thousand times.
   */
  Test.Expect<$<MyAParser, Stress.ThousandString>, Stress.ThousandTuple>
]
