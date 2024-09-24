import { $, List, Test } from '..'

type Includes_Spec = [
  /**
   * Can determine existence of elements in a tuple
   */
  Test.Expect<$<$<List.Includes, 3>, [1, 2, 3]>>,

  /**
   * Can determine non-existence of elements in a tuple
   */
  Test.ExpectNot<$<$<List.Includes, 4>, [1, 2, 3]>>,

  /**
   * Empty tuples always result in false on search.
   */
  Test.ExpectNot<$<$<List.Includes, true>, []>>,

  /**
   * Applying includes to a non-tuple results in an error.
   */
  // @ts-expect-error
  $<$<List.Includes, 1>, number>,

  /**
   * A list with a boolean element does not necessarily include 'true'.
   */
  Test.ExpectNot<$<$<List.Includes, true>, [boolean]>>
]
