import { $, Test, DigitList } from "..";

type MultiplyDigit_Spec = [
  /**
   * 2 * 2 = 4
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "2">, ["2"]>, ["4"]>,

  /**
   * 2 * 3 = 6
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "2">, ["3"]>, ["6"]>,

  /**
   * 9 * 9 = 81
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "9">, ["9"]>, ["8", "1"]>,

  /**
   * 5 * 5 = 25
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "5">, ["5"]>, ["2", "5"]>,

  /**
   * 25 * 5 = 125
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "5">, ["2", "5"]>, ["1", "2", "5"]>,

  /**
   * 999 * 9 = 8991
   */
  Test.Expect<
    $<$<DigitList.MultiplyDigit, "9">, ["9", "9", "9"]>,
    ["8", "9", "9", "1"]
  >,

  /**
   * 999 * 0 = 0
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "0">, ["9", "9", "9"]>, ["0"]>,

  /**
   * 0 * 999 = 0
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "9">, ["0"]>, ["0"]>,

  /**
   * 0 * 0 = 0
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "0">, ["0"]>, ["0"]>,

  /**
   * 123456789 * 9 = 1111111101
   */
  Test.Expect<
    $<
      $<DigitList.MultiplyDigit, "9">,
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    >,
    ["1", "1", "1", "1", "1", "1", "1", "1", "0", "1"]
  >,

  /**
   * 5*4 = 20
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "5">, ["4"]>, ["2", "0"]>,

  /**
   * 34*5 = 170
   */
  Test.Expect<$<$<DigitList.MultiplyDigit, "5">, ["3", "4"]>, ["1", "7", "0"]>,

  /**
   * 123456789 * 5 = 617283945
   */
  Test.Expect<
    $<
      $<DigitList.MultiplyDigit, "5">,
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    >,
    ["6", "1", "7", "2", "8", "3", "9", "4", "5"]
  >
];
