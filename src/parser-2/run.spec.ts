import { $, Test, Parser2 } from '..'

type Literal_Spec = [
  /**
   * Can run parsers.
   */
  Test.Expect<
    $<$<Parser2.Run, $<Parser2.Literal, 'foobar'>>, 'foobar'>,
    'foobar'
  >,

  /**
   * Run returns `never` if the parser fails.
   */
  Test.Expect<$<$<Parser2.Run, $<Parser2.Literal, 'foo'>>, 'bar'>, never>
]
