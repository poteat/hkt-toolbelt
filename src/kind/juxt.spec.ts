import { $, Kind, List, Test } from '..'

type Juxt_Spec = [
  /**
   * Apply `Juxt` with list operations.
   */
  Test.Expect<
    $<$<Kind.Juxt, [List.Length, List.Reverse]>, [1, 2, 3]>,
    [3, [3, 2, 1]]
  >,

  /**
   * Apply `Juxt` with different kind operations.
   */
  Test.Expect<
    $<$<Kind.Juxt, [List.First, List.Last]>, ['a', 'b', 'c']>,
    ['a', 'c']
  >,

  /**
   * Juxt with single operation returns a single-element tuple.
   */
  Test.Expect<$<$<Kind.Juxt, [List.Length]>, [1, 2, 3]>, [3]>,

  /**
   * Juxt with incompatible kind results in type error.
   */
  // @ts-expect-error
  $<$<Kind.Juxt, [List.Reverse, List.Length]>, string>,

  /**
   * A juxt of zero elements results in an empty tuple.
   */
  Test.Expect<$<$<Kind.Juxt, []>, [1, 2, 3]>, []>
]
