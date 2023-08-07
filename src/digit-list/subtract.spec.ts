import { $, Test, DigitList } from '..'

type Subtract_Spec = [
  /**
   * Can subtract two numbers.
   */
  Test.Expect<
    $<$<DigitList.Subtract, ['4', '5', '6']>, ['1', '2', '3']>,
    ['3', '3', '3']
  >,

  /**
   * Can subtract two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<
    $<$<DigitList.Subtract, ['1', '6', '8']>, ['1', '2', '3']>,
    ['4', '5']
  >,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<DigitList.Subtract, ['1']>, ['1']>, ['0']>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<DigitList.Subtract, []>, ['1', '2', '3']>, ['0']>,

  /**
   * Can subtract two empty lists.
   */
  Test.Expect<$<$<DigitList.Subtract, []>, []>, ['0']>,

  /**
   * Can subtract a smaller number from a larger one.
   */
  Test.Expect<
    $<$<DigitList.Subtract, ['1', '0', '0', '0']>, ['1']>,
    ['9', '9', '9']
  >,

  /**
   * Can subtract a number from itself.
   */
  Test.Expect<$<$<DigitList.Subtract, ['1', '2']>, ['1', '2']>, ['0']>,

  /**
   * Can subtract zero.
   */
  Test.Expect<$<$<DigitList.Subtract, ['1', '2']>, ['0']>, ['1', '2']>,

  /**
   * Can subtract zero from zero.
   */
  Test.Expect<$<$<DigitList.Subtract, ['0']>, ['0']>, ['0']>,

  /**
   * Can subtract large numbers.
   */
  Test.Expect<
    $<
      $<DigitList.Subtract, ['1', '2', '3', '4', '5', '6', '7', '8', '9']>,
      ['1']
    >,
    ['1', '2', '3', '4', '5', '6', '7', '8', '8']
  >,

  /**
   * Can subtract numbers that are close together.
   */
  Test.Expect<$<$<DigitList.Subtract, ['1', '2', '5']>, ['1', '2', '1']>, ['4']>
]
