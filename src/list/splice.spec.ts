import { $, List, Test } from "..";

type Splice_Spec = [
  /**
   * Can delete elements from start index without inserting elements.
   */
  Test.Expect<$<$<$<$<List.Splice, 0>, 1>, []>, ["a", "b", "c"]>, ["b", "c"]>,
  Test.Expect<$<$<$<$<List.Splice, 0>, 2>, []>, ["a", "b", "c"]>, ["c"]>,
  Test.Expect<$<$<$<$<List.Splice, 1>, 1>, []>, ["a", "b", "c"]>, ["a", "c"]>,

  /**
   * Can delete elements when start index + delete count or start index is greater than or equal to array length.
   */
  Test.Expect<$<$<$<$<List.Splice, 1>, 3>, []>, ["a", "b", "c"]>, ["a"]>,
  Test.Expect<
    $<$<$<$<List.Splice, 4>, 1>, []>, ["a", "b", "c"]>,
    ["a", "b", "c"]
  >,

  /**
   * Can insert elements from start index without deleting elements.
   */
  Test.Expect<
    $<$<$<$<List.Splice, 0>, 0>, []>, ["a", "b", "c"]>,
    ["a", "b", "c"]
  >,
  Test.Expect<
    $<$<$<$<List.Splice, 0>, 0>, ["1"]>, ["a", "b", "c"]>,
    ["1", "a", "b", "c"]
  >,
  Test.Expect<
    $<$<$<$<List.Splice, 2>, 0>, ["1", "2"]>, ["a", "b", "c"]>,
    ["a", "b", "1", "2", "c"]
  >,

  /**
   * Can both delete and insert elements from start index.
   */
  Test.Expect<
    $<$<$<$<List.Splice, 1>, 1>, ["1", "2"]>, ["a", "b", "c"]>,
    ["a", "1", "2", "c"]
  >,

  /**
   * If start index is greater than or equal to array length, append inserts to end of array.
   */
  Test.Expect<
    $<$<$<$<List.Splice, 3>, 0>, ["1", "2"]>, ["a", "b", "c"]>,
    ["a", "b", "c", "1", "2"]
  >,
  Test.Expect<
    $<$<$<$<List.Splice, 3>, 3>, ["1", "2"]>, ["a", "b", "c"]>,
    ["a", "b", "c", "1", "2"]
  >,

  /**
   * If start index is negative, the index counts back from the end of the array — if start < 0, start + array.length
   */
  Test.Expect<$<$<$<$<List.Splice, -1>, 0>, ["0"]>, [1, 2, 3]>, [1, 2, "0", 3]>,
  Test.Expect<$<$<$<$<List.Splice, -2>, 2>, ["0"]>, [1, 2, 3]>, [1, "0"]>,

  /**
   * If start index is lesser than the negated array length, append inserts to start of array.
   */
  Test.Expect<$<$<$<$<List.Splice, -4>, 0>, ["0"]>, [1, 2, 3]>, ["0", 1, 2, 3]>,

  /**
   * Non-natural numbers for delete count and non-integers for start index are not allowed.
   */
  Test.Expect<$<$<$<$<List.Splice, 1.5>, 0>, ["0"]>, [1, 2, 3]>, never>,
  Test.Expect<$<$<$<$<List.Splice, 1>, -1>, ["0"]>, [1, 2, 3]>, never>,
  Test.Expect<$<$<$<$<List.Splice, 1>, 1.5>, ["0"]>, [1, 2, 3]>, never>,

  /**
   * Returns empty tuple if applied to empty tuple.
   */
  $<$<$<$<List.Splice, 0>, 1>, [1, 2, 3]>, []>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error/
  $<$<$<$<List.Splice, 0>, 0>, []>, number>,

  /**
   * Emits an error if incorrect number of inputs are passed in.
   */
  // @ts-expect-error
  $<$<$<List.Splice, 0>, [1, 2, 3]>, []>,
  //  @ts-expect-error
  $<$<$<$<$<$<List.Splice, 1>, 2>, 3>, []>, [1, 2, 3]>, []>
];
