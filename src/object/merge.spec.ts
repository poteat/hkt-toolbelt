import { $, Test, Object } from '..'

type Merge_Spec = [
  /**
   * Can merge two objects.
   */
  Test.Expect<
    $<$<Object.Merge, { a: 1; b: 2 }>, { c: 3; d: 4 }>,
    { a: 1; b: 2; c: 3; d: 4 }
  >,

  /**
   * Can merge with an empty object.
   */
  Test.Expect<$<$<Object.Merge, {}>, { a: 1; b: 2 }>, { a: 1; b: 2 }>,

  /**
   * The second object takes precedence.
   */
  Test.Expect<$<$<Object.Merge, { a: 1 }>, { a: 2 }>, { a: 2 }>
]
