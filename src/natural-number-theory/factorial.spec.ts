import { $, Test, Number, NaturalNumberTheory } from "..";

type Factorial_Spec = [
  /**
   * 0! = 1
   */
  Test.Expect<$<NaturalNumberTheory.Factorial, 0>, 1>,

  /**
   * 1! = 1
   */
  Test.Expect<$<NaturalNumberTheory.Factorial, 1>, 1>,

  /**
   * 2! = 2
   */
  Test.Expect<$<NaturalNumberTheory.Factorial, 2>, 2>,

  /**
   * 3! = 6
   */
  Test.Expect<$<NaturalNumberTheory.Factorial, 3>, 6>,

  /**
   * 4! = 24
   */
  Test.Expect<$<NaturalNumberTheory.Factorial, 4>, 24>,

  /**
   * 5! = 120
   */
  Test.Expect<$<NaturalNumberTheory.Factorial, 5>, 120>,

  /**
   * Factorial of a negative number should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<Number._$factorial<-1>, never>>
];
