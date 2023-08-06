import { $, DigitList, Test } from "../";

export type First_Spec = [
  /**
   * Can get the first digit of a digit list.
   */
  Test.Expect<$<DigitList.First, ["1", "2", "3"]>, "1">,

  /**
   * First of an empty list is "0".
   */
  Test.Expect<$<DigitList.First, []>, "0">,

  /**
   * First of a single digit list is the digit.
   */
  Test.Expect<$<DigitList.First, ["1"]>, "1">,

  /**
   * Getting the first digit of a non-list is an error.
   */
  // @ts-expect-error
  $<DigitList.First, "1">,

  /**
   * Getting the first digit of a non-digit list is an error.
   */
  // @ts-expect-error
  $<DigitList.First, ["1", "2", "3", "a"]>
];
