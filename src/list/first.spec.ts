import { $, List, Test } from "..";

type First_Spec = [
  /**
   * Can get the first element of a tuple.
   */
  Test.Expect<$<List.First, [1, 2, 3]>, 1>,

  /**
   * The first element of an empty tuple is never.
   */
  Test.Expect<$<List.First, []>, never>,

  /**
   * The first element of a variadic tuple is correct.
   */
  Test.Expect<$<List.First, [1, 2, 3, ...number[]]>, 1>,

  /**
   * Will emit an error if applied to a non-tuple.
   */
  // @ts-expect-error
  $<List.First, number>
];
