import { $, Test, NaturalNumberTheory } from '..'

type CollatzSequence_Spec = [
  /**
   * Collatz[3922] -> 1961
   */
  Test.Expect<$<NaturalNumberTheory.Collatz, 3922>, 1961>
]
