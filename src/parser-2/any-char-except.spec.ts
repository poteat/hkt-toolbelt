import { $, Test, Parser2 } from '..'

type Literal_Spec = [
  /**
   * Can match anything except 'foobar'
   */
  Test.Expect<
    $<
      $<Parser2.AnyCharExcept, $<Parser2.Literal, 'foobar'>>,
      { input: 'foobaz'; result: never }
    >,
    { input: 'oobaz'; result: 'f' }
  >,

  /**
   * Attempting to match anything except "" will always fail.
   */
  Test.Expect<
    $<
      $<Parser2.AnyCharExcept, $<Parser2.Literal, ''>>,
      { input: 'foobaz'; result: never }
    >,
    never
  >
]
