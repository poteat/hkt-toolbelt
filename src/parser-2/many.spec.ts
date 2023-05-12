import { $, Test, Parser2 } from '..'

type MyAParser = $<Parser2.Run, $<Parser2.Many, $<Parser2.Literal, 'a'>>>

type Literal_Spec = [
  /**
   * Can match a parser many times.
   */
  Test.Expect<$<MyAParser, 'aaaaa'>, ['a', 'a', 'a', 'a', 'a']>,

  /**
   * Can match zero elements.
   */
  Test.Expect<$<MyAParser, 'bbbbb'>, []>
]
