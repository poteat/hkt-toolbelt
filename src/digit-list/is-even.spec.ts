import { $, Test, DigitList } from '..'

type IsEven_Spec = [
  /**
   * 0 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['0']>, true>,

  /**
   * 1 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['1']>, false>,

  /**
   * 2 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['2']>, true>,

  /**
   * 3 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['3']>, false>,

  /**
   * 4 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['4']>, true>,

  /**
   * 5 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['5']>, false>,

  /**
   * 6 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['6']>, true>,

  /**
   * 7 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['7']>, false>,

  /**
   * 8 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['8']>, true>,

  /**
   * 9 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['9']>, false>,

  /**
   * 10 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '0']>, true>,

  /**
   * 11 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '1']>, false>,

  /**
   * 12 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '2']>, true>,

  /**
   * 13 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '3']>, false>,

  /**
   * 14 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '4']>, true>,

  /**
   * 15 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '5']>, false>,

  /**
   * 16 is even.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '6']>, true>,

  /**
   * 17 is odd.
   */
  Test.Expect<$<DigitList.IsEven, ['1', '7']>, false>
]
