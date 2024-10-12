import { $, List, Test } from '..'

type ContainsValue_Spec = [
  /**
   * Can check if a value is present in a list.
   */
  Test.Expect<$<$<List.IncludesValue, [1, 2, 3]>, 2>>,

  /**
   * Can check if a value is present in a list with duplicates.
   */
  Test.Expect<$<$<List.IncludesValue, [1, 2, 3]>, 2>>,

  /**
   * Can determine if a value is not present in a list.
   */
  Test.ExpectNot<$<$<List.IncludesValue, [1, 2, 3]>, 10>>
]
