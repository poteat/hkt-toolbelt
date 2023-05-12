import { $, Test, Kind, Parser2 } from '..'

type State_Spec = [
  /**
   * Parsers should take in a state.
   */
  Test.Expect<$<Kind.InputOf, Parser2.Parser>, Parser2._$state>,

  /**
   * Parsers should return a state.
   */
  Test.Expect<$<Kind.OutputOf, Parser2.Parser>, Parser2._$state>
]
