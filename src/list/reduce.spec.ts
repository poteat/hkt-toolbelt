import { $, Test, List, NaturalNumber } from '..'

type Reduce_Spec = [
  /**
   * Can reduce a list of numbers to their sum.
   */
  Test.Expect<$<$<$<List.Reduce, NaturalNumber.Add>, 0>, [2, 2]>, 4>
]
