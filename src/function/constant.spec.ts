import { $, Function, Test } from "hkt-toolbelt";

type Constant_Spec = [
  /**
   * Returns the type of the configured constant, when applied to any type.
   */
  Test.Expect<$<$<Function.Constant, "foo">, 0>, "foo">
];
