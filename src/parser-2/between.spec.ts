import { $, Test, Parser2 } from '..'

type MyBetweenParser = $<
  $<$<Parser2.Between, $<Parser2.Literal, '('>>, $<Parser2.Literal, ')'>>,
  $<Parser2.Literal, 'foobar'>
>

type Between_Spec = [
  /**
   * Can match word between parens.
   */
  Test.Expect<
    $<MyBetweenParser, { input: '(foobar)'; result: never }>,
    { input: ''; result: 'foobar' }
  >
]
