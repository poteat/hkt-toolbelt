import { $, Test, DigitList, DecimalDigitList, Conditional, Digit, Union } from "..";

type DigitList_Spec = [
  /**
   * "0.1" is assignable to a decimal digit list.
   */
  Test.Expect<$<$<Conditional.Extends, [DecimalDigitList.DecimalDigitList[0]][number]>, number>>,

  /**
   * "0.0" is assignable.
   */
  Test.Expect<
    $<$<Conditional.Extends, DecimalDigitList.DecimalDigitList[number]>, 0 | Digit.Zero>
  >,

  /**
   * There are 10 available digits in both the whole number and decimal fraction sublists of a decimal digit list.
   */
  Test.Expect<$<Union.ToList, DecimalDigitList.DecimalDigitList[number]>["length"], 10>
];
