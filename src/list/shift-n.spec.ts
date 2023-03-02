import { $, List, Test } from "hkt-toolbelt";

type ShiftN_Spec = [
  /**
   * Can shfit one or more elements from the head of an array.
   */
  Test.Expect<$<$<List.ShiftN, 1>, ["a", "b", "c"]>, ["b", "c"]>,
  Test.Expect<$<$<List.ShiftN, 2>, ["a", "b", "c"]>, ["c"]>,

  /**
   * Shift of zero is identity.
   */
  Test.Expect<$<$<List.ShiftN, 0>, ["a", "b", "c"]>, ["a", "b", "c"]>,

  /**
   * Can handle being applied to an empty array.
   */
  Test.Expect<$<$<List.ShiftN, 0>, []>, []>,
  Test.Expect<$<$<List.ShiftN, 1>, []>, []>,

  /**
   * Can handle being applied to a single-element array.
   */
  Test.Expect<$<$<List.ShiftN, 1>, ["a"]>, []>,

  /**
   * Can execute high-N and overflow slices that result in empty array.
   */
  Test.Expect<$<$<List.ShiftN, 3>, ["a", "b", "c"]>, []>,
  Test.Expect<$<$<List.ShiftN, 4>, ["a", "b", "c"]>, []>,
  Test.Expect<$<$<List.ShiftN, 100>, ["a", "b", "c"]>, []>,

  /**
   * Can handle nested arrays.
   */
  Test.Expect<$<$<List.ShiftN, 1>, [1, [2, [3]]]>, [[2, [3]]]>,
  Test.Expect<$<$<List.ShiftN, 1>, [[1, 2], [3]]>, [[3]]>,
  Test.Expect<$<$<List.ShiftN, 2>, [[1, 2], [3]]>, []>,

  /**
   * Can handle different element types.
   */
  Test.Expect<$<$<List.ShiftN, 3>, ["foo" | "bar", null, ["a"]]>, []>,

  /**
   * Non-natural number N are not allowed.
   */
  Test.Expect<$<$<List.ShiftN, 1.5>, [1, 2, 3]>, never>,
  Test.Expect<$<$<List.ShiftN, -1>, [1, 2, 3]>, never>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.ShiftN<1>, number>,
];
