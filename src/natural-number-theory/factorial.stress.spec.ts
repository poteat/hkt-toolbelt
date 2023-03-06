import { $, Test, NaturalNumberTheory } from "hkt-toolbelt";

type Factorial_Spec = [
  /**
   * 30! = 265252859812191058636308480000000
   */
  Test.Expect<
    $<NaturalNumberTheory.Factorial, 30>,
    265252859812191058636308480000000n
  >
];
