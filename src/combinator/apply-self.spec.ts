import { $, Combinator, Function, String, Test } from "hkt-toolbelt";

type ApplySelf_Spec = [
  /**
   * Can be applied to the identity function.
   */
  Test.Expect<$<Combinator.ApplySelf, Function.Identity>, Function.Identity>,

  /**
   * May be applied to a constant function.
   */
  Test.Expect<$<Combinator.ApplySelf, $<Function.Constant, "foo">>, "foo">,

  /**
   * Emits an error if applied to a function that may not be applied to itself.
   */
  // @ts-expect-error
  $<Combinator.ApplySelf, String.Append<"foo">>
];
