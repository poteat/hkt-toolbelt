import { $, List, Test } from "hkt-toolbelt";

type IsVariadic_Spec = [
  /**
   * Can determine if a tuple is variadic.
   */
  Test.Expect<$<List.IsVariadic, [1, 2, 3, ...number[]]>>,

  /**
   * Can determine if a tuple is not variadic.
   */
  Test.ExpectNot<$<List.IsVariadic, [1, 2, 3]>>,

  /**
   * Can determine if a tuple of indeterminate length is variadic.
   */
  Test.Expect<$<List.IsVariadic, number[]>>,

  /**
   * Emits an error if the tuple is not a tuple.
   */
  // @ts-expect-error
  $<List.IsVariadic, number>
];
