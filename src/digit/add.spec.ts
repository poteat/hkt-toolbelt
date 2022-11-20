import { $, Test, Digit } from "..";

type Add_Spec = [
  /**
   * Zero plus zero is zero.
   */
  Test.Expect<$<$<Digit.Add, Digit.Zero>, Digit.Zero>, Digit.Zero>,

  /**
   * Zero plus one is one.
   */
  Test.Expect<$<$<Digit.Add, Digit.Zero>, "1">, "1">,

  /**
   * One plus zero is one.
   */
  Test.Expect<$<$<Digit.Add, "1">, Digit.Zero>, "1">,

  /**
   * One plus one is two.
   */
  Test.Expect<$<$<Digit.Add, "1">, "1">, "2">,

  /**
   * Two plus two is four.
   */
  Test.Expect<$<$<Digit.Add, "2">, "2">, "4">,

  /**
   * Nine plus one is wraps to zero.
   */
  Test.Expect<$<$<Digit.Add, "9">, "1">, "0">,

  /**
   * Nine plus nine is wraps to eight.
   */
  Test.Expect<$<$<Digit.Add, "9">, "9">, "8">,

  /**
   * Adding a non-digit throws an error.
   */
  // @ts-expect-error
  $<$<Digit.Add, "a">, "1">,

  /**
   * Adding numeric literals throws an error.
   */
  // @ts-expect-error
  $<$<Digit.Add, 1>, "1">
];
