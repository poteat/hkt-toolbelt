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
  Test.Expect<$<$<List.Slice, -1>, ["a", "b", "c"]>, never>,

  /**
   * Can execute zero slice against 10 elements.
   */
  Test.Expect<$<$<List.Slice, 0>, Ten>, Ten>,

  /**
   * Can execute zero slice against 100 elements.
   */
  Test.Expect<$<$<List.Slice, 0>, Hundred>, Hundred>,

  /**
   * Can execute zero slice against 1000 elements.
   */
  Test.Expect<$<$<List.Slice, 0>, Thousand>, Thousand>,

  /**
   * Can execute zero slice against 2000 elements.
   */
  Test.Expect<
    $<$<List.Slice, 0>, [...Thousand, ...Thousand]>,
    [...Thousand, ...Thousand]
  >,

  /**
   * Can execute zero slice against 3000 elements.
   */
  Test.Expect<
    $<$<List.Slice, 0>, [...Thousand, ...Thousand, ...Thousand]>,
    [...Thousand, ...Thousand, ...Thousand]
  >,

  /**
   * Can execute zero slice against 4000 elements.
   */
  Test.Expect<
    $<$<List.Slice, 0>, [...Thousand, ...Thousand, ...Thousand, ...Thousand]>,
    [...Thousand, ...Thousand, ...Thousand, ...Thousand]
  >,

  /**
   * Can execute zero slice against 5000 elements.
   */
  Test.Expect<
    $<
      $<List.Slice, 0>,
      [...Thousand, ...Thousand, ...Thousand, ...Thousand, ...Thousand]
    >,
    [...Thousand, ...Thousand, ...Thousand, ...Thousand, ...Thousand]
  >,

  /**
   * Can execute 90 slice against 100 elements.
   */
  Test.Expect<$<$<List.Slice, 90>, Hundred>, Ten>,

  /**
   * Can execute 990 slice against 1000 elements.
   */
  Test.Expect<$<$<List.Slice, 990>, Thousand>, Ten>,

  /**
   * Can execute a 1990 slice against 2000 elements.
   */
  Test.Expect<$<$<List.Slice, 1990>, [...Thousand, ...Thousand]>, Ten>
];

type Ten = ["a", "b", "c", "d", "e", "f", "g", "h", "i", " "];

type Hundred = [
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten,
  ...Ten
];

type Thousand = [
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred,
  ...Hundred
];
