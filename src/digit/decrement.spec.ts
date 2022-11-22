import { $, Test, Digit } from "..";

type Decrement_Spec = [
  /**
   * Decrementing a digit should return the previous digit in the sequence.
   */
  Test.Expect<$<Digit.Decrement, "0">, "9">,

  /**
   * 1 should decrement to 0.
   */
  Test.Expect<$<Digit.Decrement, "1">, "0">,

  /**
   * '9' should decrement to '8'.
   */
  Test.Expect<$<Digit.Decrement, "9">, "8">,

  /**
   * An error should be thrown if the input is not a valid digit.
   */
  // @ts-expect-error
  $<Digit.Decrement, "10">
];
