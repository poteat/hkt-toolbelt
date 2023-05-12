import { $, Test, DecimalDigitList } from '../'

type Compare_Spec = [

  /**
   * Can Compare two DecimalDigitLists.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "2", "3"]>, ["1", "2", "3"]>, 0>,
  
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "2", "3"]>, ["3", "2", "1"]>, -1>,

  Test.Expect<$<$<DecimalDigitList.Compare, ["3", "2", "1"]>, ["1", "2", "3"]>, 1>,

  /**
   * Can Compare two 3-digit DecimalDigitLists that result in a two-digit DecimalDigitList.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "6", "8"]>, ["1", "2", "3"]>, 1>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1"]>, ["1"]>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, []>, ["1", "2", "3"]>, -1>,

  /**
   * Can Compare two empty lists.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, []>, []>, 0>,

  /**
   * Disregards trailing zeros
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "0", "0", "0"]>, ["1"]>, 0>,
  
  /**
   * Correctly handles leading zeros
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["0", "0", "0", "1"]>, ["1"]>, -1>,

  Test.Expect<$<$<DecimalDigitList.Compare, ["0", "1", "2", "3"]>, ["0", "1", "2", "3", "4"]>, -1>,

  Test.Expect<$<$<DecimalDigitList.Compare, ["0", "1", "2", "3", "4"]>, ["0", "0", "1", "2", "3", "4"]>, 1>,

  Test.Expect<$<$<DecimalDigitList.Compare, ["0", "0", "0", "1", "2", "3", "4"]>, ["0", "1", "2", "3", "4"]>, -1>,

  /**
   * Can Compare a DecimalDigitList from itself.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "2"]>, ["1", "2"]>, 0>,

  /**
   * Can Compare zero.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "2"]>, ["0"]>, 1>,

  /**
   * Can Compare zero from zero.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["0"]>, ["0"]>, 0>,

  /**
   * Can Compare large DecimalDigitLists.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["1", "2", "3", "4", "5", "6", "7", "8", "9"]>, ["1"]>, 1>,

  /**
   * Can Compare DecimalDigitLists that are close together.
   */
  Test.Expect<$<$<DecimalDigitList.Compare, ["0", "1", "2", "5"]>, ["0", "1", "2", "1"]>, 1>
];
