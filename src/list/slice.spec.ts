import { $, List, Test } from "hkt-toolbelt";

type Slice_Spec = [
  /**
   * Can slice one or more elements from both ends of an array with zero-based indexes.
   */
  Test.Expect<$<$<List.Slice, [0, 1]>, ["a", "b", "c"]>, ["a"]>,
  Test.Expect<$<$<List.Slice, [0, 2]>, ["a", "b", "c"]>, ["a", "b"]>,
  Test.Expect<$<$<List.Slice, [0, 3]>, ["a", "b", "c"]>, ["a", "b", "c"]>,
  Test.Expect<$<$<List.Slice, [1, 2]>, ["a", "b", "c"]>, ["b"]>,
  Test.Expect<$<$<List.Slice, [1, 3]>, ["a", "b", "c"]>, ["b", "c"]>,

  /**
   * Can slice one or more elements from both ends of an array with negative indexes.
   */
  Test.Expect<$<$<List.Slice, [-2, -1]>, ["a", "b", "c"]>, ["b"]>,
  Test.Expect<$<$<List.Slice, [-3, -1]>, ["a", "b", "c"]>, ["a", "b"]>,
  Test.Expect<$<$<List.Slice, [-3, -2]>, ["a", "b", "c"]>, ["a"]>,
  
  Test.Expect<$<$<List.Slice, [0, -2]>, ["a", "b", "c"]>, ["a"]>,
  Test.Expect<$<$<List.Slice, [1, -1]>, ["a", "b", "c"]>, ["b"]>,

  /**
   * If end is positioned before or at start after normalization, return empty array.
   */
  Test.Expect<$<$<List.Slice, [0, 0]>, ["a", "b", "c"]>, []>,
  Test.Expect<$<$<List.Slice, [-1, -1]>, ["a", "b", "c"]>, []>,
  Test.Expect<$<$<List.Slice, [2, 1]>, ["a", "b", "c"]>, []>,
  Test.Expect<$<$<List.Slice, [-1, -2]>, ["a", "b", "c"]>, []>,

  /**
   * Can handle being applied to an empty array.
   */
  Test.Expect<$<$<List.Slice, [0, 0]>, []>, []>,

  /**
   * Can handle being applied to a single-element array.
   */
  Test.Expect<$<$<List.Slice, [0, 1]>, ["a"]>, ["a"]>,
  Test.Expect<$<$<List.Slice, [0, -1]>, ["a"]>, []>,

  /**
   * Can execute high-N and overflow slices.
   * If start >= array.length, nothing is extracted.
   * If start < -array.length or start is omitted, 0 is used.
   * If end >= array.length, all elements until the end are extracted.
   */
  Test.Expect<$<$<List.Slice, [0, 4]>, ["a", "b", "c"]>, ["a", "b", "c"]>,
  Test.Expect<$<$<List.Slice, [1, 4]>, ["a", "b", "c"]>, ["b", "c"]>,
  Test.Expect<$<$<List.Slice, [4, 100]>, ["a", "b", "c"]>, []>,
  Test.Expect<$<$<List.Slice, [-4, -1]>, ["a", "b", "c"]>, ["a", "b"]>,
  Test.Expect<$<$<List.Slice, [-100, 4]>, ["a", "b", "c"]>, ["a", "b", "c"]>,
  Test.Expect<$<$<List.Slice, [-100, -1]>, ["a", "b", "c"]>, ["a", "b"]>,
  Test.Expect<$<$<List.Slice, [-101, -100]>, ["a", "b", "c"]>, []>,

  /**
   * Non-integer input are not allowed.
   */
  Test.Expect<$<$<List.Slice, [1.5, 0]>, [1, 2, 3]>, never>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<$<List.Slice, [0, 0]>, number>,

  /**
   * Emits an error if range is given as a a non-tuple.
   */
  // @ts-expect-error
  $<$<List.Slice, 0>, [1, 2, 3]>,

  /**
   * Emits an error if range is not given as a tuple of length 2.
   */
  // @ts-expect-error
  $<$<List.Slice, [0]>, [1, 2, 3]>,
  // @ts-expect-error
  $<$<List.Slice, [1, 2, 3]>, [1, 2, 3]>,
];
