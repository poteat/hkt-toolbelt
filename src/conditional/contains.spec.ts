import { $, Conditional, Test } from "hkt-toolbelt";

type Extends_Spec = [
  /**
   * T contains T (T extends T) => true
   */
  Test.Expect<$<$<Conditional.Contains, true>, true>>,

  /**
   * boolean contains true (true extends boolean) => true
   */
  Test.Expect<$<$<Conditional.Contains, true>, boolean>>,

  /**
   * true contains boolean (boolean extends true) => false
   */
  Test.ExpectNot<$<$<Conditional.Contains, boolean>, true>>,

  /**
   * number contains string (string extends number) => false
   */
  Test.ExpectNot<$<$<Conditional.Contains, string>, number>>
];
