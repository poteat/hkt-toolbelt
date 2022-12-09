import { $, Test, DigitList } from "..";

/**
 * We should be able to divide two natural numbers specified as digit lists,
 * with the following syntax:
 *
 * ```ts
 * $<$<DigitList.Divide, ["1", "2", "3"]>, ["4", "5", "6"]>
 * ```
 */
type Divide_Spec = [
  /**
   * 0 / 0 = 0. The quotient is 0.
   */
  Test.Expect<$<$<DigitList.Divide, ["0"]>, ["0"]>, ["0"]>,

  /**
   * 10 / 2 = 5. The quotient is 5.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "0"]>, ["2"]>, ["5"]>,

  /**
   * 123 / 17 results is 7.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "2", "3"]>, ["1", "7"]>, ["7"]>,

  /**
   * 123 / 1 = 123. The quotient is 123.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "2", "3"]>, ["1"]>, ["1", "2", "3"]>,

  /**
   * 123 / 123 = 1. The quotient is 1.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "2", "3"]>, ["1", "2", "3"]>, ["1"]>,

  /**
   * 100 / 25 = 4.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "0", "0"]>, ["2", "5"]>, ["4"]>,

  /**
   * 100 / 50 = 2.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "0", "0"]>, ["5", "0"]>, ["2"]>,

  /**
   * 100 / 75 = 1.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "0", "0"]>, ["7", "5"]>, ["1"]>,

  /**
   * 100 / 99 = 1.
   */
  Test.Expect<$<$<DigitList.Divide, ["1", "0", "0"]>, ["9", "9"]>, ["1"]>,

  /**
   * Can perform complicated division.
   */
  Test.Expect<
    $<
      $<DigitList.Divide, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]>,
      ["5"]
    >,
    ["2", "4", "6", "9", "1", "3", "5", "7"]
  >
];
