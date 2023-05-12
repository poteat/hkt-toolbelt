import { $, $$, Test, Parser2, Number, Object } from '..'

type Map_Spec = [
  /**
   * Can map a parser '123' to a number using parser result mapping.
   */
  Test.Expect<
    $<
      $$<
        [Parser2.Literal, $<Parser2.Map, Number.FromString>, Parser2.Run],
        '123'
      >,
      '123'
    >,
    123
  >
]
