import { $, Function, List, Test } from '..'

type FlatMap_Spec = [
  /**
   * Can map over a list, returning a flattened list.
   */
  Test.Expect<$<$<List.FlatMap, List.Times>, [1, 2, 3]>, [0, 0, 1, 0, 1, 2]>,

  /**
   * Identity function returns a 1-flattened list.
   */
  Test.Expect<$<$<List.FlatMap, Function.Identity>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Flattening is only one level deep.
   */
  Test.Expect<
    $<$<List.FlatMap, Function.Identity>, [[[1, 2]], [3, 4]]>,
    [[1, 2], 3, 4]
  >
]
