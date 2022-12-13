import { $, Conditional, Test } from "hkt-toolbelt";

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
  Test.ExpectNot<$<Conditional.Equals<true>, boolean>>,

  /**
   * True does not equal never.
   */
  Test.ExpectNot<$<Conditional.Equals<true>, never>>,

  /**
   * Never does not equal true.
   */
  Test.ExpectNot<$<Conditional.Equals<never>, true>>,

  /**
   * Never equals never.
   */
  Test.Expect<$<Conditional.Equals<never>, never>>
];
