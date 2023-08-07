import { $, Test, Digit } from '..';

type DecrementTens_Spec = [
  /**
   * The tens place after decrementing is 1 if the input is 0.
   */
  Test.Expect<$<Digit.DecrementTens, '0'>, '1'>,

  /**
   * The tens place after decrementing is 0 if the input is between 1 and 9.
   */
  Test.Expect<$<Digit.DecrementTens, '1'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '2'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '3'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '4'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '5'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '6'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '7'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '8'>, '0'>,
  Test.Expect<$<Digit.DecrementTens, '9'>, '0'>,

  /**
   * An error should be thrown if the input is not a valid digit.
   */
  // @ts-expect-error
  $<Digit.DecrementTens, '10'>
];
