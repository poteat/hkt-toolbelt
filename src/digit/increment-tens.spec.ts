import { $, Test, Digit } from '..';

type IncrementTens_Spec = [
  /**
   * The tens place after incrementing is 1 if the input is 9.
   */
  Test.Expect<$<Digit.IncrementTens, '9'>, '1'>,

  /**
   * The tens place after incrementing is 0 if the input is not 9.
   */
  Test.Expect<$<Digit.IncrementTens, '0'>, '0'>,

  /**
   * An error should be thrown if the input is not a valid digit.
   */
  // @ts-expect-error
  $<Digit.IncrementTens, '10'>
];
