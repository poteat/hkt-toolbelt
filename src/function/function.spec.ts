import { $, Conditional, Function, Test } from "hkt-toolbelt";

type Function_Spec = [
  /**
   * All functions are a subtype of Function.
   */
  Test.Expect<$<Conditional.Extends<Function.Function>, (x: number) => number>>,

  /**
   * Empty functions are a subtype of Function.
   */
  Test.Expect<$<Conditional.Extends<Function.Function>, () => void>>,

  /**
   * Functions returning never are a subtype of Function.
   */
  Test.Expect<$<Conditional.Extends<Function.Function>, () => never>>,

  /**
   * Other types are not a subtype of Function.
   */
  Test.ExpectNot<$<Conditional.Extends<Function.Function>, number>>
];
