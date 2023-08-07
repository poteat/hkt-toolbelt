import { $, Test, Digit } from '..';

type Increment_Spec = [
  /**
   * Incrementing a digit should return the next digit in the sequence.
   */
  Test.Expect<$<Digit.Increment, '0'>, '1'>,

  /**
   * 9 should increment to 0.
   */
  Test.Expect<$<Digit.Increment, '9'>, '0'>,

  /**
   * An error should be thrown if the input is not a valid digit.
   */
  // @ts-expect-error
  $<Digit.Increment, '10'>
];
