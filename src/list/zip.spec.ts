import { $, Test, List } from '..';

type Zip_Spec = [
  /**
   * Empty array returns empty array
   */
  Test.Expect<$<List.Zip, []>, []>,

  /**
   * Array of empty sub-arrays returns empty array
   */
  Test.Expect<$<List.Zip, [[]]>, []>,
  Test.Expect<$<List.Zip, [[], []]>, []>,

  /**
   * Correctly handles sub-arrays of length 1
   */
  Test.Expect<$<List.Zip, [[1], [1], [1], [1]]>, [[1, 1, 1, 1]]>,

  /**
   * Correctly handles arbitrarily nested sub-arrays
   */
  Test.Expect<
    $<List.Zip, [[[1]], [[[1]]], [[[[1]]]], [[[[[1]]]]]]>,
    [[[1], [[1]], [[[1]]], [[[[1]]]]]]
  >,

  /**
   * Correctly handles input sub-arrays with different lengths
   */
  Test.Expect<
    $<
      List.Zip,
      [
        [1, 2, 3],
        ['a', 'b', 'c', 'd'],
        [true, false, null, undefined],
        ['A', 'B', 'C', 'D']
      ]
    >,
    [[1, 'a', true, 'A'], [2, 'b', false, 'B'], [3, 'c', null, 'C']]
  >,

  /**
   * Non-array input returns never
   */
  Test.Expect<$<List.Zip, boolean>, never>
];
