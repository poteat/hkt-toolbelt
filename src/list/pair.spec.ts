import { $, List, Test } from '..';

type Pair_Spec = [
  /**
   * Can generate a tuple of pairs from a tuple, where each element is paired
   * with the next element.
   */
  Test.Expect<$<List.Pair, [1, 2, 3, 4]>, [[1, 2], [2, 3], [3, 4]]>,

  /**
   * The pair of an empty tuple is an empty tuple.
   */
  Test.Expect<$<List.Pair, []>, []>,

  /**
   * The pair of a one-tuple is an empty tuple.
   */
  Test.Expect<$<List.Pair, [1]>, []>,

  /**
   * The pair of a two-tuple is a one-tuple.
   */
  Test.Expect<$<List.Pair, [1, 2]>, [[1, 2]]>,

  /**
   * The pair of a tuple of indeterminate length is a tuple of pairs of
   * indeterminate length.
   */
  Test.Expect<$<List.Pair, number[]>, [number, number][]>,

  /**
   * When a variadic is introduced in a pair, it fuzzes the type of the pair.
   */
  Test.Expect<
    $<List.Pair, [string, ...number[]]>,
    [string | number, string | number][]
  >
];
