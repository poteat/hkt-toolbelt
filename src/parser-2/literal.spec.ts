import { $, Test, Parser2 } from '..'

type Literal_Spec = [
  /**
   * Can match a string literal.
   */
  Test.Expect<
    $<$<Parser2.Literal, 'foobar'>, { input: 'foobar'; result: never }>,
    { input: ''; result: 'foobar' }
  >,

  /**
   * Will allow unconsumed input.
   */
  Test.Expect<
    $<$<Parser2.Literal, 'foo'>, { input: 'foobar'; result: never }>,
    { input: 'bar'; result: 'foo' }
  >,

  /**
   * If the input does not match the string literal, the entire returned state
   * is never.
   */
  Test.Expect<
    $<$<Parser2.Literal, 'barfoo'>, { input: 'foobar'; result: never }>,
    never
  >
]
