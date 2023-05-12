import { $, Test, Parser2 } from '..'

type Char_Spec = [
  /**
   * Can match a character literal.
   */
  Test.Expect<
    $<$<Parser2.Char, 'f'>, { input: 'foobar'; result: never }>,
    { input: 'oobar'; result: 'f' }
  >,

  /**
   * Can match unions of character literals.
   */
  Test.Expect<
    $<$<Parser2.Char, 'f' | 'b'>, { input: 'foobar'; result: never }>,
    { input: 'oobar'; result: 'f' }
  >
]
