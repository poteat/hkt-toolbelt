import { $, Test, Parser2 } from '..'

type MySepParser = $<
  $<Parser2.SepBy, $<Parser2.Literal, ' '>>,
  $<Parser2.Literal, 'foobar'>
>

type SepBy_Spec = [
  /**
   * Can match words separated by spaces.
   */
  Test.Expect<
    $<MySepParser, { input: 'foobar foobar'; result: never }>,
    { input: ''; result: ['foobar', 'foobar'] }
  >,

  /**
   * A trailing space will cause the parser to fail.
   */
  Test.Expect<
    $<MySepParser, { input: 'foobar foobar '; result: never }>,
    never
  >,

  /**
   * No match is fine.
   */
  Test.Expect<
    $<MySepParser, { input: 'barfoo'; result: never }>,
    { input: 'barfoo'; result: [] }
  >
]
