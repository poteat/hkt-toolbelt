import { $, Test, Digit } from "..";

type Multiply_Spec = [
  /**
   * 2 * 2 = 04
   */
  Test.Expect<$<$<Digit.MultiplyTens, "2">, "2">, "0">,

  /**
   * 2 * 3 = 06
   */
  Test.Expect<$<$<Digit.MultiplyTens, "2">, "3">, "0">,

  /**
   * 9 * 9 = 81
   */
  Test.Expect<$<$<Digit.MultiplyTens, "9">, "9">, "8">,

  /**
   * 5 * 5 = 25
   */
  Test.Expect<$<$<Digit.MultiplyTens, "5">, "5">, "2">
];
