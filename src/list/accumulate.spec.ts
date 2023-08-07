import { $, Test, List, Number, NaturalNumber } from '..';

type Accumulate_Spec = [
  /**
   * Can correctly produce a prefix sum array.
   */
  Test.Expect<
    $<$<$<List.Accumulate, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5]>,
    [1, 3, 6, 10, 15]
  >,
  Test.Expect<
    $<$<$<List.Accumulate, NaturalNumber.Add>, 100>, [1, 2, 3, 4, 5]>,
    [101, 103, 106, 110, 115]
  >,

  /**
   * Can correctly produce running Max and Min arrays.
   */
  Test.Expect<
    $<
      $<$<List.Accumulate, Number.Max>, Number.MIN_SAFE_INTEGER>,
      [-3, -2, -1, 0, 1, 0, -1, -2, -3]
    >,
    [-3, -2, -1, 0, 1, 1, 1, 1, 1]
  >,

  Test.Expect<
    $<
      $<$<List.Accumulate, Number.Min>, Number.MAX_SAFE_INTEGER>,
      [3, 2, 1, 0, -1, 0, 1, 2, 3]
    >,
    [3, 2, 1, 0, -1, -1, -1, -1, -1]
  >,

  /**
   * Empty array input retursn empty array.
   */
  Test.Expect<$<$<$<List.Accumulate, NaturalNumber.Add>, 0>, []>, []>,

  /**
   * Emits an error when applied to non-list input.
   */
  // @ts-expect-error
  Test.Expect<
    // @ts-expect-error
    $<$<$<List.Accumulate, NaturalNumber.Add>, 0>, unknown>,
    []
  >
];
