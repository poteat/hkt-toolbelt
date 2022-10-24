import { Test } from "../../src";

type Test_Spec = [
  /**
   * Expect should pass compilation with a true type.
   */
  Test.Expect<true>,

  /**
   * ExpectNot should pass compilation with a false type.
   */
  Test.ExpectNot<false>,

  /**
   * Expect should emit an error on false type.
   */
  // @ts-expect-error
  Test.Expect<false>,

  /**
   * ExpectNot should emit an error on true type.
   */
  // @ts-expect-error
  Test.ExpectNot<true>,

  /**
   * Expect should emit an error on non-boolean types.
   */
  // @ts-expect-error
  Test.Expect<number>,

  /**
   * ExpectNot should emit an error on non-boolean types.
   */
  // @ts-expect-error
  Test.ExpectNot<number>,

  /**
   * Expect should emit an error on the never type.
   */
  // @ts-expect-error
  Test.Expect<never>,

  /**
   * Expect should emit an error on the never type.
   */
  // @ts-expect-error
  Test.ExpectNot<never>
];
