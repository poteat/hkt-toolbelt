import { $, Test, NaturalNumberTheory } from '..'

type CollatzSequence_Spec = [
  /**
   * Collatz[3922] -> 1961
   */
  Test.Expect<$<NaturalNumberTheory.Collatz, 3922>, 1961>,

  /**
   * Collatz sequence of 39
   */
  Test.Expect<$<NaturalNumberTheory.CollatzSequence, 39>['length'], 35>
]
