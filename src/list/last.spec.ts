import { $, List, Test } from '..';

type Last_Spec = [
  /**
   * Can extract the last element of a tuple.
   */
  Test.Expect<$<List.Last, [1, 2, 3]>, 3>,

  /**
   * The last element of an empty tuple is never.
   */
  Test.Expect<$<List.Last, []>, never>,

  /**
   * The last element of a tuple of indeterminate length is the underlying type.
   */
  Test.Expect<$<List.Last, number[]>, number>,

  /**
   * When the last element of a tuple is variadic, the last element found is the
   * underlying type under the variadic.
   */
  Test.Expect<$<List.Last, [string, ...number[]]>, number>,

  /**
   * When there are elements after a variadic type, the last such element is
   * selected as the last element.
   */
  Test.Expect<$<List.Last, [string, ...number[], 'foo']>, 'foo'>,

  /**
   * The last element of a one-tuple is the one element.
   */
  Test.Expect<$<List.Last, [string]>, string>
];
