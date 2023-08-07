import { $, DigitList, Test } from '../';

type Compare_Spec = [
  /**
   * Can compare two numbers.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "2", "3"]>, ["1", "2", "3"]>, 0>,
  
  Test.Expect<$<$<DigitList.Compare, ["1", "2", "3"]>, ["3", "2", "1"]>, -1>,

  Test.Expect<$<$<DigitList.Compare, ["3", "2", "1"]>, ["1", "2", "3"]>, 1>,

  /**
   * Can compare two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "6", "8"]>, ["1", "2", "3"]>, 1>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<DigitList.Compare, ["1"]>, ["1"]>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<DigitList.Compare, []>, ["1", "2", "3"]>, -1>,

  /**
   * Can compare two empty lists.
   */
  Test.Expect<$<$<DigitList.Compare, []>, []>, 0>,

  /**
   * Can compare a larger number to a smaller one.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "0", "0", "0"]>, ["1"]>, 1>,
  
  /**
   * Can compare a smaller number to a larger one.
   */
  Test.Expect<$<$<DigitList.Compare, ["1"]>, ["1", "0", "0", "0"]>, -1>,

  /**
   * Can compare a number from itself.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "2"]>, ["1", "2"]>, 0>,

  /**
   * Can compare zero.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "2"]>, ["0"]>, 1>,

  /**
   * Can compare zero from zero.
   */
  Test.Expect<$<$<DigitList.Compare, ["0"]>, ["0"]>, 0>,

  /**
   * Can compare large numbers.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]>, ["1"]>, 1>,

  /**
   * Can compare numbers that are close together.
   */
  Test.Expect<$<$<DigitList.Compare, ["1", "2", "5"]>, ["1", "2", "1"]>, 1>
];
