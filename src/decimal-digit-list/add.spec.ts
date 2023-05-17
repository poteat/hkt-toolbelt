import { $, Test, DecimalDigitList } from "..";

type Add_Spec = [
  /**
   * Can add two numbers.
   */
  Test.Expect<
    $<$<DecimalDigitList.Add, [0, "1", "2", "3"]>, [0, "4", "5", "6"]>,
    [0, "5", "7", "9"]
  >,

  /**
   * Can add two numbers with different lengths.
   */
  Test.Expect<
    $<$<DecimalDigitList.Add, [0, "1", "2", "3"]>, [0, "4", "5"]>,
    [0, "5", "7", "3"]
  >,

  /**
   * Empty lists are treated as zero.
   */
  Test.Expect<$<$<DecimalDigitList.Add, [0]>, [0, "4", "5"]>, [0, "4", "5"]>,

  /**
   * Can add two empty lists.
   */
  Test.Expect<$<$<DecimalDigitList.Add, [0]>, [0]>, [0]>,

  /**
   * Carry is propagated.
   */
  Test.Expect<$<$<DecimalDigitList.Add, [0, "9", "9", "9"]>, [0, "1"]>, [1, "0", "9", "9"]>
];
