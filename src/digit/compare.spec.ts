import { $, Digit, Test } from '../';

type Compare_Spec = [
  /**
   * Zero is equal to zero.
   */
  Test.Expect<$<$<Digit.Compare, Digit.Zero>, Digit.Zero>, 0>,

  /**
   * Zero is lesser than one.
   */
  Test.Expect<$<$<Digit.Compare, Digit.Zero>, "1">, -1>,

  /**
   * One is greater than zero.
   */
  Test.Expect<$<$<Digit.Compare, "1">, Digit.Zero>, 1>,

  /**
   * One is equal to one.
   */
  Test.Expect<$<$<Digit.Compare, "1">, "1">, 0>,

  /**
   * Two is lesser than nine.
   */
  Test.Expect<$<$<Digit.Compare, "2">, "9">, -1>,

  /**
   * Nine is greater than one.
   */
  Test.Expect<$<$<Digit.Compare, "9">, "1">, 1>,

  /**
   * Comparing a non-digit throws an error.
   */
  // @ts-expect-error
  $<$<Digit.Compare, "a">, "1">,

  /**
   * Comparing numeric literals throws an error.
   */
  // @ts-expect-error
  $<$<Digit.Compare, 1>, "1">
];
