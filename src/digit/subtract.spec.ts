import { $, Test, Digit } from '..';

type Subtract_Spec = [
  /**
   * Zero minus zero is zero.
   */
  Test.Expect<$<$<Digit.Subtract, Digit.Zero>, Digit.Zero>, Digit.Zero>,

  /**
   * Zero minus one is nine.
   */
  Test.Expect<$<$<Digit.Subtract, Digit.Zero>, '1'>, '9'>,

  /**
   * One minus zero is one.
   */
  Test.Expect<$<$<Digit.Subtract, '1'>, Digit.Zero>, '1'>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<Digit.Subtract, '1'>, '1'>, '0'>,

  /**
   * Two minus nine is three.
   */
  Test.Expect<$<$<Digit.Subtract, '2'>, '9'>, '3'>,

  /**
   * Nine minus one is eight.
   */
  Test.Expect<$<$<Digit.Subtract, '9'>, '1'>, '8'>,

  /**
   * Subtracting a non-digit throws an error.
   */
  // @ts-expect-error
  $<$<Digit.Subtract, 'a'>, '1'>,

  /**
   * Subtracting numeric literals throws an error.
   */
  // @ts-expect-error
  $<$<Digit.Subtract, 1>, '1'>
];
