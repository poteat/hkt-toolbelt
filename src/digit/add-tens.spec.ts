import { $, Test, Digit } from '..';

type AddTens_Spec = [
  /**
   * Zero plus zero is zero.
   */
  Test.Expect<$<$<Digit.AddTens, Digit.Zero>, Digit.Zero>, Digit.Zero>,

  /**
   * Zero plus one results in a zero in the tens place.
   */
  Test.Expect<$<$<Digit.AddTens, Digit.Zero>, '1'>, '0'>,

  /**
   * One plus zero results in a zero in the tens place.
   */
  Test.Expect<$<$<Digit.AddTens, '1'>, Digit.Zero>, '0'>,

  /**
   * One plus one results in a zero in the tens place.
   */
  Test.Expect<$<$<Digit.AddTens, '1'>, '1'>, '0'>,

  /**
   * Five plus five results in a one in the tens place.
   */
  Test.Expect<$<$<Digit.AddTens, '5'>, '5'>, '1'>,

  /**
   * Nine plus one results in a one in the tens place.
   */
  Test.Expect<$<$<Digit.AddTens, '9'>, '1'>, '1'>,

  /**
   * Nine plus nine results in a one in the tens place.
   */
  Test.Expect<$<$<Digit.AddTens, '9'>, '9'>, '1'>,

  /**
   * Adding a non-digit throws an error.
   */
  // @ts-expect-error
  $<$<Digit.AddCarry, 'a'>, '1'>
];
