import { $, List, Test } from '..';

type At_Spec = [
  /**
   * Can handle positive indices.
   */
  Test.Expect<$<$<List.At, 0>, ['a', 'b', 'c']>, 'a'>,
  Test.Expect<$<$<List.At, 1>, ['a', 'b', 'c']>, 'b'>,
  Test.Expect<$<$<List.At, 2>, ['a', 'b', 'c']>, 'c'>,

  /**
   * Can handle negative indices.
   */
  Test.Expect<$<$<List.At, -1>, ['a', 'b', 'c']>, 'c'>,
  Test.Expect<$<$<List.At, -2>, ['a', 'b', 'c']>, 'b'>,
  Test.Expect<$<$<List.At, -3>, ['a', 'b', 'c']>, 'a'>,

  /**
   * Overflow indices result in `never`
   */
  Test.Expect<$<$<List.At, 3>, ['a', 'b', 'c']>, never>,
  Test.Expect<$<$<List.At, -4>, ['a', 'b', 'c']>, never>,

  /**
   * Empty arrays always return `never`.
   */
  Test.Expect<$<$<List.At, 0>, []>, never>,
  Test.Expect<$<$<List.At, 1>, []>, never>,

  /**
   * Can handle nested arrays.
   */
  Test.Expect<$<$<List.At, 1>, [1, [2, [3]]]>, [2, [3]]>,
  Test.Expect<$<$<List.At, 1>, [[1, 2], [3]]>, [3]>,
  Test.Expect<$<$<List.At, 2>, [[1, 2], [3]]>, never>,

  /**
   * Can handle different element types.
   */
  Test.Expect<$<$<List.At, 0>, ['foo' | 'bar', null, ['a']]>, 'foo' | 'bar'>,

  /**
   * Non-natural number N are not allowed.
   */
  Test.Expect<$<$<List.At, 1.5>, [1, 2, 3]>, never>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<$<List.At, 1>, number>
];
