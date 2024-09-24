import { $, List, NaturalNumberTheory, Test } from '..'

type FibonacciSequence_Spec = [
  /**
   * Fibonacci sequence of 100
   */
  Test.Expect<
    $<List.Last, $<$<NaturalNumberTheory.FibnonacciSequence, 100>, [0, 1]>>,
    218922995834555169026n
  >
]
