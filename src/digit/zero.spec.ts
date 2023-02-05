import { $, Test, DigitList, Conditional, Digit, Union } from "..";

type Zero_Spec = [
  /**
   * "0" is assignable to a digit.
   */
  Test.Expect<$<$<Conditional.Extends, Digit.Digit>, Digit.Zero>>,

  /**
   * Zero plus zero is zero.
   */
  Test.Expect<$<$<DigitList.Add, [Digit.Zero]>, [Digit.Zero]>, [Digit.Zero]>,

  /**
   * Zero plus one is one.
   */
  Test.Expect<$<$<DigitList.Add, [Digit.Zero]>, ["1"]>, ["1"]>,

  /**
   * Zero is zero.
   */
  Test.Expect<Digit.Zero, "0">
];
