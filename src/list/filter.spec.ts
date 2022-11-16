import { $, Conditional, Function, Kind, List, Test } from "hkt-toolbelt";

type Filter_Spec = [
  /**
   * Can filter specific elements in a tuple.
   */
  Test.Expect<$<List.Filter<Conditional.Equals<3>>, [1, 2, 3, 3]>, [3, 3]>,

  /**
   * Can perform dynamic subtype checks.
   */
  Test.Expect<
    $<List.Filter<Conditional.Extends<string>>, [1, "f", 2, "g", 3]>,
    ["f", "g"]
  >,

  /**
   * Filtering an empty tuple results in an empty tuple.
   */
  Test.Expect<$<List.Filter<Function.Constant<true>>, []>, []>,

  /**
   * Filtering with a constant true condition results in the same tuple.
   */
  Test.Expect<$<List.Filter<Function.Constant<true>>, [1, 2, 3]>, [1, 2, 3]>,

  /**
   * Filtering with a constant false condition results in the empty tuple.
   */
  Test.Expect<$<List.Filter<Function.Constant<false>>, [1, 2, 3]>, []>,

  /**
   * Non-boolean returning filter functions emit an error.
   */
  // @ts-expect-error
  List.Filter<Function.Constant<number>>,

  /**
   * Non-kind filter parameters result in a compilation error.
   */
  // @ts-expect-error
  List.Filter<number>,

  /**
   * Values can be applied to a filter function using Apply.
   */
  Test.Expect<
    $<Kind.Apply<[1, "foo", 2, 3]>, List.Filter<Conditional.Extends<number>>>,
    [1, 2, 3]
  >
];
