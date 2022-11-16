import { $, Conditional, Function, List, Test } from "hkt-toolbelt";

type Find_Spec = [
  /**
   * Can find a number present in a tuple.
   */
  Test.Expect<$<List.Find<Conditional.Equals<3>>, [1, 2, 3]>, 3>,

  /**
   * Searching for a non-existent element returns `never`.
   */
  Test.Expect<$<List.Find<Conditional.Equals<4>>, [1, 2, 3]>, never>,

  /**
   * Can find elements according to dynamic conditions.
   */
  Test.Expect<
    $<List.Find<Conditional.Extends<string>>, [1, 2, 3, "foo", "bar"]>,
    "foo"
  >,

  /**
   * Non-boolean returning find functions emit an error.
   */
  // @ts-expect-error
  List.Find<Function.Identity>
];
