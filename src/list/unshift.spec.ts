import { $, List, Test } from '..'

type Unshift_Spec = [
  /**
   * Can prepend items.
   */
  Test.Expect<$<$<List.Unshift, 1>, [2, 3, 4]>, [1, 2, 3, 4]>,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Unshift<4>, number>
]
