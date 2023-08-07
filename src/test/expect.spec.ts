import { Test } from "..";

type Expect_Spec = [
  /**
   * Expect should pass compilation with a true type.
   */
  Test.Expect<true>,

  /**
   * Expect should emit an error on false type.
   */
  // @ts-expect-error
  Test.Expect<false>,

  /**
   * Expect should emit an error on non-boolean types.
   */
  // @ts-expect-error
  Test.Expect<number>,

  /**
   * Expect should emit an error on the never type.
   */
  // @ts-expect-error
  Test.Expect<never, true>
];
