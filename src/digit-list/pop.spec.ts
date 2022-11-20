import { $, Test, DigitList } from "..";

type Pop_Spec = [
  /**
   * Can pop the last digit of a digit list.
   */
  Test.Expect<$<DigitList.Pop, ["1", "2", "3"]>, ["1", "2"]>,

  /**
   * Can pop the last digit of a single digit list.
   */
  Test.Expect<$<DigitList.Pop, ["1"]>, []>,

  /**
   * Popping an empty list results in an empty list.'
   */
  Test.Expect<$<DigitList.Pop, []>, []>
];
