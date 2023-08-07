import { $, Test, DigitList } from '..';

type Modulo_Spec = [
  /**
   * 0 % 0 = 0. The quotient is 0, and the remainder is 0.
   */
  Test.Expect<$<$<DigitList.Modulo, ['0']>, ['0']>, ['0']>,

  /**
   * 10 % 2 = 0. The quotient is 5, and the remainder is 0.
   */
  Test.Expect<$<$<DigitList.Modulo, ['1', '0']>, ['2']>, ['0']>,

  /**
   * 123 % 17 = 4
   */
  Test.Expect<$<$<DigitList.Modulo, ['1', '2', '3']>, ['1', '7']>, ['4']>,

  /**
   * 123 % 123 = 0
   */
  Test.Expect<$<$<DigitList.Modulo, ['1', '2', '3']>, ['1', '2', '3']>, ['0']>,

  /**
   * 100 % 25 = 0
   */
  Test.Expect<$<$<DigitList.Modulo, ['1', '0', '0']>, ['2', '5']>, ['0']>,

  /**
   * 67 % 25 = 17
   */
  Test.Expect<$<$<DigitList.Modulo, ['6', '7']>, ['2', '5']>, ['1', '7']>,

  /**
   * 123 % 67 = 56
   */
  Test.Expect<$<$<DigitList.Modulo, ['1', '2', '3']>, ['6', '7']>, ['5', '6']>
];
