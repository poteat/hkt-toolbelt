import { Test, Parser2 } from '..'

type State_Spec = [
  /**
   * We expect state to have state!
   */
  Test.Expect<
    Parser2._$state,
    {
      input: string
      result: unknown
    }
  >
]
