import { $, Conditional, Test } from "hkt-toolbelt";

type Extends_Spec = [
  /**
   * T extends T => true
   */
  Test.Expect<$<$<Conditional.Extends, true>, true>>,

  /**
   * true extends boolean => true
   */
  Test.Expect<$<$<Conditional.Extends, boolean>, true>>,

  /**
   * boolean extends true => false
   */
  Test.ExpectNot<$<$<Conditional.Extends, true>, boolean>>,

  /**
   * number extends string => false
   */
  Test.ExpectNot<$<$<Conditional.Extends, string>, number>>
];
