import { $, Test, Parser, Stress } from '..'

type Many1_StressSpec = [
  /**
   * Can match 10 characters.
   */
  Test.Expect<
    $<$<Parser.Run, $<Parser.Many1, $<Parser.String, 'x'>>>, Stress.TenString>,
    Stress.TenTuple
  >
  /**
   * Can match 100 characters.
   */
  //   Test.Expect<
  //     $<
  //       $<Parser.Run, $<Parser.Many1, $<Parser.String, "x">>>,
  //       Stress.HundredString
  //     >,
  //     Stress.HundredTuple
  //   >
]
