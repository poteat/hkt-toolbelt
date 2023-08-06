import { $, Function, Test } from "..";

type Identity_Spec = [
  /**
   * Returns the type it is applied to.
   */
  Test.Expect<$<Function.Identity, "foo">, "foo">,

  /**
   * Returns the type it is applied to, even if it is a function.
   */
  Test.Expect<
    $<Function.Identity, (x: number) => number>,
    (x: number) => number
  >,

  /**
   * Can return itself.
   */
  Test.Expect<$<Function.Identity, Function.Identity>, Function.Identity>
];
