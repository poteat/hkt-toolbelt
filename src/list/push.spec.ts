import { $, List, Test } from "hkt-toolbelt";

type Push_Spec = [
  /**
   * Can push elements to the end of a tuple.
   */
  Test.Expect<$<$<List.Push, 3>, [1, 2]>, [1, 2, 3]>,

  /**
   * Pushing to an empty tuple results in a tuple with just the pushed element.
   */
  Test.Expect<$<$<List.Push, "foo">, []>, ["foo"]>,

  /**
   * Pushing to a tuple with a rest parameter results in a tuple with the
   * pushed element.
   */
  Test.Expect<
    $<$<List.Push, "foo">, [1, 2, ...string[]]>,
    [1, 2, ...string[], "foo"]
  >,

  /**
   * Pushing a union type results in a tuple with the union type.
   */
  Test.Expect<$<$<List.Push, "foo" | "bar">, []>, ["foo" | "bar"]>,

  /**
   * Emits an error if being applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.Push<"foo">, number>
];
