import { $, Conditional, Test } from "hkt-toolbelt";

type Extends_Spec = [
  /**
   * A type extends itself.
   */
  Test.Expect<$<Conditional.Extends<true>, true>>,

  /**
   * A type extends a subtype.
   */
  Test.Expect<$<Conditional.Extends<boolean>, true>>,

  /**
   * A type does not extend a supertype.
   */
  Test.ExpectNot<$<Conditional.Extends<true>, boolean>>,

  /**
   * A type does not extend a different type.
   */
  Test.ExpectNot<$<Conditional.Extends<string>, number>>
];
