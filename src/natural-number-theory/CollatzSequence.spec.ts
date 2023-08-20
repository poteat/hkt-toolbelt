import { $, Test, NaturalNumberTheory } from '..'

type CollatzSequence_Spec = [
  /**
   * Collatz sequence of 39
   */
  Test.Expect<$<NaturalNumberTheory.CollatzSequence, 39>['length'], 35>
]
