import { $, Test, DigitList } from "..";

type Multiply_Spec = [
  /**
   * 2 * 2 = 4
   */
  Test.Expect<$<$<DigitList.Multiply, ["2"]>, ["2"]>, ["4"]>,

  /**
   * 2 * 3 = 6
   */
  Test.Expect<$<$<DigitList.Multiply, ["2"]>, ["3"]>, ["6"]>,

  /**
   * 9 * 9 = 81
   */
  Test.Expect<$<$<DigitList.Multiply, ["9"]>, ["9"]>, ["8", "1"]>,

  /**
   * 5 * 5 = 25
   */
  Test.Expect<$<$<DigitList.Multiply, ["5"]>, ["5"]>, ["2", "5"]>,

  /**
   * 25 * 5 = 125
   */
  Test.Expect<$<$<DigitList.Multiply, ["5"]>, ["2", "5"]>, ["1", "2", "5"]>,

  /**
   * 999 * 9 = 8991
   */
  Test.Expect<
    $<$<DigitList.Multiply, ["9"]>, ["9", "9", "9"]>,
    ["8", "9", "9", "1"]
  >,

  /**
   * 999 * 1 = 999
   */
  Test.Expect<
    $<$<DigitList.Multiply, ["1"]>, ["9", "9", "9"]>,
    ["9", "9", "9"]
  >,

  /**
   * 25 * 25 = 625
   */
  Test.Expect<
    $<$<DigitList.Multiply, ["2", "5"]>, ["2", "5"]>,
    ["6", "2", "5"]
  >,

  /**
   * 999 * 0 = 0
   */
  Test.Expect<$<$<DigitList.Multiply, ["0"]>, ["9", "9", "9"]>, ["0"]>,

  /**
   * 0 * 999 = 0
   */
  Test.Expect<$<$<DigitList.Multiply, ["9"]>, ["0"]>, ["0"]>,

  /**
   * 0 * 0 = 0
   */
  Test.Expect<$<$<DigitList.Multiply, ["0"]>, ["0"]>, ["0"]>,

  /**
   * 123456789 * 9 = 1111111101
   */
  Test.Expect<
    $<
      $<DigitList.Multiply, ["9"]>,
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    >,
    ["1", "1", "1", "1", "1", "1", "1", "1", "0", "1"]
  >,

  /**
   * 123456789 * 123456789 = 15241578750190521
   */
  Test.Expect<
    $<
      $<DigitList.Multiply, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]>,
      ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    >,
    [
      "1",
      "5",
      "2",
      "4",
      "1",
      "5",
      "7",
      "8",
      "7",
      "5",
      "0",
      "1",
      "9",
      "0",
      "5",
      "2",
      "1"
    ]
  >
];
