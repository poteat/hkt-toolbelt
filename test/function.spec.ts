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

type Constant_Spec = [
  /**
   * Returns the type of the configured constant, when applied to any type.
   */
  Test.Expect<$<Function.Constant<"foo">, 0>, "foo">
];

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
