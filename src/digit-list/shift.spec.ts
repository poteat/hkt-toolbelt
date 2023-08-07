import { $, Test, DigitList } from '..'

type Shift_Spec = [
  /**
   * Can shift the first digit of a digit list.
   */
  Test.Expect<$<DigitList.Shift, ['1', '2', '3']>, ['2', '3']>,

  /**
   * Can shift the first digit of a single digit list.
   */
  Test.Expect<$<DigitList.Shift, ['1']>, []>,

  /**
   * Shifting an empty list results in an empty list.'
   */
  Test.Expect<$<DigitList.Shift, []>, []>
]
