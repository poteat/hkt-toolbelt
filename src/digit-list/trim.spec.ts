import { $, Test, DigitList } from "..";

type Trim_Spec = [
  /**
   * Trimming zero should result in zero.
   */
  Test.Expect<$<DigitList.Trim, ["0"]>, ["0"]>,

  /**
   * Trimming an empty zero should result in zero.
   */
  Test.Expect<$<DigitList.Trim, []>, ["0"]>,

  /**
   * Trimming a single digit should result in the same digit.
   */
  Test.Expect<$<DigitList.Trim, ["1"]>, ["1"]>,

  /**
   * Trimming a digit with leading zeros should result in the same digit.
   */
  Test.Expect<$<DigitList.Trim, ["0", "1"]>, ["1"]>,

  /**
   * Should be able to handle multiple leading zeros.
   */
  Test.Expect<$<DigitList.Trim, ["0", "0", "1"]>, ["1"]>,

  /**
   * Should be able to handle all zeroes.
   */
  Test.Expect<$<DigitList.Trim, ["0", "0", "0"]>, ["0"]>
];
