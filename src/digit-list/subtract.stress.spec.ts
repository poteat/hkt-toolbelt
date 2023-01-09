import { $, Test, DigitList } from ".."

type Subtract_Spec = [
  /**
   * Can subtract large numbers.
   */
  Test.Expect<
    $<
      $<DigitList.Subtract, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]>,
      ["1"]
    >,
    ["1", "2", "3", "4", "5", "6", "7", "8", "8"]
  >
]
