import { $, $$, Test, Parser2, Number, Object, Parser } from '..'

type Map_Spec = [
  /**
   * Can map a parser '123' to a number using parser result mapping.
   */
  Test.Expect<
    $<
      $<
        Parser2.Run,
        $<$<Parser2.Map, $<Parser2.Literal, '123'>>, Number.FromString>
      >,
      '123'
    >,
    123
  >
]
