import { $, List, Test } from '..'

type IsEmpty_Spec = [
  /**
   * Can check if a list is empty.
   */
  Test.Expect<$<List.IsEmpty, []>, true>,

  /**
   * Can check if a list is not empty.
   */
  Test.Expect<$<List.IsEmpty, [1, 2, 3]>, false>
]
