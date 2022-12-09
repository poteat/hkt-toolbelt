import { $, Test, DigitList } from "..";

type DivideBySubtraction_Spec = [
  /**
   * 0 / 0 = 0. The quotient is 0, and the remainder is 0.
   */
  Test.Expect<$<$<DigitList.DivideBySubtraction, ["0"]>, ["0"]>, ["0"]>,

  /**
   * 10 / 2 = 5. The quotient is 5, and the remainder is 0.
   */
  Test.Expect<$<$<DigitList.DivideBySubtraction, ["1", "0"]>, ["2"]>, ["5"]>,

  /**
   * 123 / 17 results is 7 remainder 4.
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "2", "3"]>, ["1", "7"]>,
    ["7"]
  >,

  /**
   * 123 / 123 = 1. The quotient is 1, and the remainder is 0.
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "2", "3"]>, ["1", "2", "3"]>,
    ["1"]
  >,

  /**
   * 100 / 25 = 4, remainder 0
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "0", "0"]>, ["2", "5"]>,
    ["4"]
  >,

  /**
   * 100 / 50 = 2, remainder 0
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "0", "0"]>, ["5", "0"]>,
    ["2"]
  >,

  /**
   * 100 / 75 = 1, remainder 25
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "0", "0"]>, ["7", "5"]>,
    ["1"]
  >,

  /**
   * 100 / 99 = 1, remainder 1
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "0", "0"]>, ["9", "9"]>,
    ["1"]
  >,

  /**
   * 100 / 100 = 1, remainder 0
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "0", "0"]>, ["1", "0", "0"]>,
    ["1"]
  >,

  /**
   * 100 / 101 = 0, remainder 100
   */
  Test.Expect<
    $<$<DigitList.DivideBySubtraction, ["1", "0", "0"]>, ["1", "0", "1"]>,
    ["0"]
  >
];
