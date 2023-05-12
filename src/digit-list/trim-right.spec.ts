import { $, Test, Kind, DigitList } from "..";

type TrimRight_Spec = [
  /**
   * Trimming zero should result in zero.
   */
  Test.Expect<$<DigitList.TrimRight, ["0"]>, ["0"]>,

  /**
   * Trimming an empty zero should result in zero.
   */
  Test.Expect<$<DigitList.TrimRight, []>, ["0"]>,

  /**
   * Trimming a single digit should result in the same digit.
   */
  Test.Expect<$<DigitList.TrimRight, ["1"]>, ["1"]>,

  /**
   * Trimming a digit with trailing zeros should result in the same digit.
   */
  Test.Expect<$<DigitList.TrimRight, ["1", "0"]>, ["1"]>,

  /**
   * Should be able to handle multiple trailing zeros.
   */
  Test.Expect<$<DigitList.TrimRight, ["1", "0", "0"]>, ["1"]>,

  /**
   * Should be able to handle all zeroes.
   */
  Test.Expect<$<DigitList.TrimRight, ["0", "0", "0"]>, ["0"]>
];
