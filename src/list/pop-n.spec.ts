import { $, List, Test } from '..'

type PopN_Spec = [
  /**
   * Can pop one or more elements from the tail of an array.
   */
  Test.Expect<$<$<List.PopN, 1>, ['a', 'b', 'c']>, ['a', 'b']>,
  Test.Expect<$<$<List.PopN, 2>, ['a', 'b', 'c']>, ['a']>,

  /**
   * Shift of zero is identity.
   */
  Test.Expect<$<$<List.PopN, 0>, ['a', 'b', 'c']>, ['a', 'b', 'c']>,

  /**
   * Can handle being applied to an empty array.
   */
  Test.Expect<$<$<List.PopN, 0>, []>, []>,
  Test.Expect<$<$<List.PopN, 1>, []>, []>,

  /**
   * Can handle being applied to a single-element array.
   */
  Test.Expect<$<$<List.PopN, 1>, ['a']>, []>,

  /**
   * Can execute high-N and overflow slices that result in empty array.
   */
  Test.Expect<$<$<List.PopN, 3>, ['a', 'b', 'c']>, []>,
  Test.Expect<$<$<List.PopN, 4>, ['a', 'b', 'c']>, []>,
  Test.Expect<$<$<List.PopN, 100>, ['a', 'b', 'c']>, []>,

  /**
   * Can handle nested arrays.
   */
  Test.Expect<$<$<List.PopN, 1>, [1, [2, [3]]]>, [1]>,
  Test.Expect<$<$<List.PopN, 1>, [[1, 2], [3]]>, [[1, 2]]>,
  Test.Expect<$<$<List.PopN, 2>, [[1, 2], [3]]>, []>,

  /**
   * Can handle different element types.
   */
  Test.Expect<$<$<List.PopN, 3>, ['foo' | 'bar', null, ['a']]>, []>,

  /**
   * Non-natural number N are not allowed.
   */
  Test.Expect<$<$<List.PopN, 1.5>, [1, 2, 3]>, never>,
  Test.Expect<$<$<List.PopN, -1>, [1, 2, 3]>, never>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.PopN<1>, number>
]
