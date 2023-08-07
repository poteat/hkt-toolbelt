import { $, Test, DigitList } from '..';

type IsOdd_Spec = [
  /**
   * 0 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['0']>, false>,

  /**
   * 1 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['1']>, true>,

  /**
   * 2 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['2']>, false>,

  /**
   * 3 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['3']>, true>,

  /**
   * 4 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['4']>, false>,

  /**
   * 5 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['5']>, true>,

  /**
   * 6 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['6']>, false>,

  /**
   * 7 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['7']>, true>,

  /**
   * 8 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['8']>, false>,

  /**
   * 9 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['9']>, true>,

  /**
   * 10 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '0']>, false>,

  /**
   * 11 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '1']>, true>,

  /**
   * 12 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '2']>, false>,

  /**
   * 13 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '3']>, true>,

  /**
   * 14 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '4']>, false>,

  /**
   * 15 is odd.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '5']>, true>,

  /**
   * 16 is even.
   */
  Test.Expect<$<DigitList.IsOdd, ['1', '6']>, false>
];
