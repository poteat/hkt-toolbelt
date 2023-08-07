import { Test } from '..';

type ExpectNot_Spec = [
  /**
   * ExpectNot should pass compilation with a false type.
   */
  Test.ExpectNot<false>,

  /**
   * ExpectNot should emit an error on true type.
   */
  // @ts-expect-error
  Test.ExpectNot<true>,

  /**
   * ExpectNot should emit an error on non-boolean types.
   */
  // @ts-expect-error
  Test.ExpectNot<number>,

  /**
   * Expect should emit an error on the never type.
   */
  // @ts-expect-error
  Test.ExpectNot<never>,

  /**
   * ExpectNot should error if passed in never.
   */
  // @ts-expect-error
  Test.ExpectNot<true, never>
];
