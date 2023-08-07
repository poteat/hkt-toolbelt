import { $, Conditional, Test } from "..";

type Extends_Spec = [
  /**
   * T is a supertype of T (T extends T) => true
   */
  Test.Expect<$<$<Conditional.IsSupertypeOf, true>, true>>,

  /**
   * boolean is a supertype of true (true extends boolean) => true
   */
  Test.Expect<$<$<Conditional.IsSupertypeOf, true>, boolean>>,

  /**
   * true is a supertype of boolean (boolean extends true) => false
   */
  Test.ExpectNot<$<$<Conditional.IsSupertypeOf, boolean>, true>>,

  /**
   * number is a supertype of string (string extends number) => false
   */
  Test.ExpectNot<$<$<Conditional.IsSupertypeOf, string>, number>>
];
