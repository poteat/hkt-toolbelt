import { $, Test, Parser2 } from '../..'

type OptionalWhitespace_Spec = [
  /**
   * Can match whitespace
   */
  Test.Expect<
    $<
      Parser2.Utility.OptionalWhitespace,
      { input: '   foobar'; result: never }
    >,
    { input: 'foobar'; result: '   ' }
  >,

  /**
   * It's fine if there is no whitespace.
   */
  Test.Expect<
    $<Parser2.Utility.OptionalWhitespace, { input: 'foobar'; result: never }>,
    { input: 'foobar'; result: '' }
  >
]
