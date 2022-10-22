import $, { List, Conditional, Test, Function } from "hkt-toolbelt";

type Map_Spec = [
  /**
   * Map can execute conditionals over tuples.
   */
  Test.Expect<
    Conditional._$equals<
      $<List.Map<Conditional.Equals<"foo">>, ["foo", "bar"]>,
      [true, false]
    >
  >,

  /**
   * Empty input corresponds to empty output.
   */
  Test.Expect<
    Conditional._$equals<$<List.Map<Conditional.Equals<"foo">>, []>, []>
  >,

  /**
   * Non-tuple input emits a compiler error
   */
  // @ts-expect-error
  $<List.Map<Function.Identity>, number>
];
