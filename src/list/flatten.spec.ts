import { $, Test, List } from "..";

type Flatten_Spec = [
  /**
   * Flattening empty array results in empty array.
   */
  Test.Expect<$<List.Flatten, []>, []>,

  /**
   * Flattening array with no nested elements is identity.
   */
  Test.Expect<$<List.Flatten, ["a", "b", "c", "d"]>, ["a", "b", "c", "d"]>,

  /**
   * Flattens array with single-level nested elements.
   */
  Test.Expect<$<List.Flatten, ["a", ["b", "c", "d"]]>, ["a", "b", "c", "d"]>,

  /**
   * Flattens array with multiple higher-level nested elements.
   */
  Test.Expect<$<List.Flatten, ["a", ["b"], ["c", [["d"]]]]>, ["a", "b", "c", "d"]>,

  /**
   * Flattens nested array with elements of multiple types.
   */
  Test.Expect<$<List.Flatten, [[{ foo: 'bar'; 2: 10 }, 'foobar']]>, [{ foo: 'bar'; 2: 10 }, 'foobar']>,

  /**
   * Flattens array nested at 20 levels.
   */
  Test.Expect<$<List.Flatten, [[[[[[[[[[[[[[[[[[[["a"]]]]]]]]]]]]]]]]]]]]>, ["a"]>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Flatten, number>,
];
