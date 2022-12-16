import { $, Test, List } from "..";

type Slice_Spec = [
  /**
   * slice(abc, 1) => bc
   */
  Test.Expect<$<$<List.Slice, 1>, ["a", "b", "c"]>, ["b", "c"]>,

  /**
   * Slice of zero is identity.
   */
  Test.Expect<$<$<List.Slice, 0>, ["a", "b", "c"]>, ["a", "b", "c"]>,

  /**
   * Can slice an empty array.
   */
  Test.Expect<$<$<List.Slice, 0>, []>, []>,

  /**
   * Can do non-zero slice on empty array.
   */
  Test.Expect<$<$<List.Slice, 1>, []>, []>,

  /**
   * Can slice a single element array.
   */
  Test.Expect<$<$<List.Slice, 1>, ["a"]>, []>,

  /**
   * Can execute slice of 2
   */
  Test.Expect<$<$<List.Slice, 2>, ["a", "b", "c"]>, ["c"]>,

  /**
   * Can execute high-N slices that result in empty array.
   */
  Test.Expect<$<$<List.Slice, 3>, ["a", "b", "c"]>, []>,

  /**
   * Can execute overflow slices.
   */
  Test.Expect<$<$<List.Slice, 4>, ["a", "b", "c"]>, []>,

  /**
   * Non-integral slices are not allowed.
   */
  Test.Expect<$<$<List.Slice, 1.5>, ["a", "b", "c"]>, never>,

  /**
   * Negative slices are not allowed.
   */
  Test.Expect<$<$<List.Slice, -1>, ["a", "b", "c"]>, never>
];
