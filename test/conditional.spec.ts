import $, { Conditional, Test } from "hkt-toolbelt";

type Equals_Spec = [
  /**
   * A type equals itself.
   */
  Test.Expect<$<Conditional.Equals<true>, true>>,

  /**
   * A type does not equal a different type.
   */
  Test.ExpectNot<$<Conditional.Equals<true>, false>>,

  /**
   * A type does not equal a supertype.
   */
  Test.ExpectNot<$<Conditional.Equals<true>, boolean>>
];

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
