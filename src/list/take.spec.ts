import { $, List, Test } from '..'

type Take_Spec = [
  /**
   * Can take the first two elements of a list.
   */
  Test.Expect<$<$<List.Take, 2>, [1, 2, 3]>, [1, 2]>,

  /**
   * Can take the first three elements of a list.
   */
  Test.Expect<$<$<List.Take, 3>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Can take zero elements from a list.
   */
  Test.Expect<$<$<List.Take, 0>, [1, 2, 3]>, []>,

  /**
   * Taking more elements than the list contains returns never.
   */
  Test.Expect<$<$<List.Take, 4>, [1, 2, 3]>, never>
]
