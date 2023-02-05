import { $, Conditional, Function, List, String, Test } from "hkt-toolbelt";

type Includes_Spec = [
  /**
   * Can determine existence of elements in a tuple
   */
  Test.Expect<$<List.Includes<$<Conditional.Equals, 3>>, [1, 2, 3]>>,

  /**
   * Can determine non-existence of elements in a tuple
   */
  Test.ExpectNot<$<List.Includes<$<Conditional.Equals, 4>>, [1, 2, 3]>>,

  /**
   * Empty tuples always result in false on search.
   */
  Test.ExpectNot<$<List.Includes<Function.Constant<true>>, []>>,

  /**
   * Setting a constant inclusion function results in true for non-empty tuples.
   */
  Test.Expect<$<List.Includes<Function.Constant<true>>, [1, 2, 3]>>,

  /**
   * Setting a constant-false inclusion function results in false.
   */
  Test.ExpectNot<$<List.Includes<Function.Constant<false>>, [1, 2, 3]>>,

  /**
   * Can perform complex multidimensional filtering. In this example, select
   * only tuples that contain at least one string.
   */
  Test.Expect<
    $<
      List.Filter<List.Includes<$<Conditional.Extends, string>>>,
      [[1, 2, 3], [1, 2, 3, "f"], ["a", "b", "c"]]
    >,
    [[1, 2, 3, "f"], ["a", "b", "c"]]
  >,

  /**
   * Non-boolean inclusion check emit an error.
   */
  // @ts-expect-error
  List.Includes<Function.Constant<number>>,

  /**
   * Applying data that doesn't match the predicate input type emits an error.
   */
  // @ts-expect-error
  $<List.Includes<String.StartsWith<"foo">>, [1, 2, 3]>,

  /**
   * Applying includes to a non-tuple results in an error.
   */
  // @ts-expect-error
  $<List.Includes<Function.Constant<true>>, number>
];
