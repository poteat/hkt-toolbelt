import { $, Test, Parser } from '..'

type Parser_Spec = [
  /**
   * A parser can be applied with a state input.
   */
  Test.Expect<
    $<
      Parser.Parser,
      {
        input: 'hello world'
        index: 0
        result: never
      }
    >,
    Parser._$state
  >
]
