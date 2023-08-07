import { $, Test, DigitList, Conditional, Digit, Union } from '..';

type DigitList_Spec = [
  /**
   * "1" is assignable to a digit list.
   */
  Test.Expect<$<$<Conditional.Extends, DigitList.DigitList[number]>, '1'>>,

  /**
   * The zero digit is assignable.
   */
  Test.Expect<
    $<$<Conditional.Extends, DigitList.DigitList[number]>, Digit.Zero>
  >,

  /**
   * There are 10 digits.
   */
  Test.Expect<$<Union.ToList, DigitList.DigitList[number]>['length'], 10>
];
