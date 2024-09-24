import { $, List, Test } from '..'

type Intersect_Spec = [
  /**
   * Can find the common elements in two lists.
   */
  Test.Expect<$<$<List.Intersect, [1, 2, 3]>, [1, 2, 3, 4, 5]>, [1, 2, 3]>,

  /**
   * Can find the common elements in two lists, even if the lists are empty.
   */
  Test.Expect<$<$<List.Intersect, []>, []>, []>,

  /**
   * Can find the common elements in two lists, even if the lists are the same.
   */
  Test.Expect<$<$<List.Intersect, [1, 2, 3]>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Can result in an empty list if the lists are disjoint.
   */
  Test.Expect<$<$<List.Intersect, [1, 2, 3]>, [4, 5, 6]>, []>
]
