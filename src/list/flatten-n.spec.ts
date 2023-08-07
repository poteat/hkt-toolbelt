import { $, Test, List } from "..";

type FlattenN_Spec = [
  /**
   * Flattening empty array results in empty array.
   */
  Test.Expect<$<$<List.FlattenN, 1>, []>, []>,

  /**
   * Flattening array with no nested elements is identity.
   */
  Test.Expect<$<$<List.FlattenN, 1>, ["a", "b", "c", "d"]>, ["a", "b", "c", "d"]>,

  /**
   * Flattening array with depth level zero is identity.
   */
  Test.Expect<$<$<List.FlattenN, 0>, ["a", "b", "c", "d"]>, ["a", "b", "c", "d"]>,
  Test.Expect<$<$<List.FlattenN, 0>, ["a", ["b"], ["c", [["d"]]]]>, ["a", ["b"], ["c", [["d"]]]]>,

  /**
   * Flattens array with single-level nested elements.
   */
  Test.Expect<$<$<List.FlattenN, 1>, ["a", ["b", "c", "d"]]>, ["a", "b", "c", "d"]>,
  Test.Expect<$<$<List.FlattenN, 1>, [["a"], ["b", "c", "d"]]>, ["a", "b", "c", "d"]>,

  /**
   * Flattens array with multiple higher-level nested elements.
   */
  Test.Expect<$<$<List.FlattenN, 1>, ["a", ["b"], ["c", [["d"]]]]>, ["a", "b", "c", [["d"]]]>,

  /**
   * Flattens nested array with elements of multiple types.
   */
  Test.Expect<$<$<List.FlattenN, 1>, [[{ foo: 'bar'; 2: 10 }, 'foobar']]>, [{ foo: 'bar'; 2: 10 }, 'foobar']>,

  /**
   * Flattens array nested at 20 levels.
   */
  Test.Expect<$<$<List.FlattenN, 19>, [[[[[[[[[[[[[[[[[[[["a"]]]]]]]]]]]]]]]]]]]]>, ["a"]>,

  /**
   * Non-natrual number N is not allowed.
   */
  Test.Expect<$<$<List.FlattenN, -2>, ["a", ["b"], ["c", [["d"]]]]>, never>,
  Test.Expect<$<$<List.FlattenN, 1.5>, ["a", ["b"], ["c", [["d"]]]]>, never>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<$<List.FlattenN, 1>, number>,
];
