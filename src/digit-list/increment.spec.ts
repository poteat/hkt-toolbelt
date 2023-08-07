import { $, Test, DigitList } from '..';

type Increment_Spec = [
  /**
   * Can increment a digit list of zero.
   */
  Test.Expect<$<DigitList.Increment, ['0']>, ['1']>,

  /**
   * Can increment a digit list of zero in empty form.
   */
  Test.Expect<$<DigitList.Increment, []>, ['1']>,

  /**
   * Can increment a digit list of one.
   */
  Test.Expect<$<DigitList.Increment, ['1']>, ['2']>,

  /**
   * Can increment a digit list of 10.
   */
  Test.Expect<$<DigitList.Increment, ['1', '0']>, ['1', '1']>,

  /**
   * Can increment a digit list of 9999.
   */
  Test.Expect<
    $<DigitList.Increment, ['9', '9', '9', '9']>,
    ['1', '0', '0', '0', '0']
  >
];
