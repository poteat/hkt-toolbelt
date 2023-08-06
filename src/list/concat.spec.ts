import { $, List, Test } from "hkt-toolbelt";

type Concat_Spec = [
  /**
   * Can concatenate a tuple to the end of a tuple.
   */
  Test.Expect<$<$<List.Concat, [3, 4]>, [1, 2]>, [1, 2, 3, 4]>,

  /**
   * Pushing to an empty tuple results in a tuple with just the concatenated tuple.
   */
  Test.Expect<$<$<List.Concat, ["foo", "bar"]>, []>, ["foo", "bar"]>,

  /**
   * Concatenating to a tuple with a rest parameter results in a tuple with the
   * concatenated tuple.
   */
  Test.Expect<
    $<$<List.Concat, ["foo"]>, [1, 2, ...string[]]>,
    [1, 2, ...string[], "foo"]
  >,

  /**
   * Concatenating a tuple with union types results in a tuple with the union types.
   */
  Test.Expect<
    $<$<List.Concat, ["foo" | "bar", "alice" | "bob"]>, []>,
    ["foo" | "bar", "alice" | "bob"]
  >,

  /**
   * Concatenating a non-tuple element results in the element being pushed to the end of a tuple.
   */
  Test.Expect<$<$<List.Concat, 3>, [1, 2]>, [1, 2, 3]>,
  Test.Expect<$<$<List.Concat, "foo" | "bar">, [1, 2]>, [1, 2, "foo" | "bar"]>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Concat<"foo">, number>
];
