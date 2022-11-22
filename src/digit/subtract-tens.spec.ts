import { $, Test, Digit } from "..";

type SubtractTens_Spec = [
  /**
   * 'SubtractTens' is one if the second digit is greater than the first.
   */
  Test.Expect<$<$<Digit.SubtractTens, Digit.Zero>, Digit.Zero>, Digit.Zero>,

  /**
   * 0 minus 1 is 1.
   */
  Test.Expect<$<$<Digit.SubtractTens, Digit.Zero>, "1">, "1">,

  /**
   * One minus zero is zero.
   */
  Test.Expect<$<$<Digit.SubtractTens, "1">, Digit.Zero>, "0">,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<Digit.SubtractTens, "1">, "1">, Digit.Zero>,

  /**
   * Two minus nine is one.
   */
  Test.Expect<$<$<Digit.SubtractTens, "2">, "9">, "1">,

  /**
   * Nine minus one is zero.
   */
  Test.Expect<$<$<Digit.SubtractTens, "9">, "1">, "0">,

  /**
   * Subtracting a non-digit throws an error.
   */
  // @ts-expect-error
  $<$<Digit.SubtractTens, "a">, "1">,

  /**
   * Subtracting numeric literals throws an error.
   */
  // @ts-expect-error
  $<$<Digit.SubtractTens, 1>, "1">
];
