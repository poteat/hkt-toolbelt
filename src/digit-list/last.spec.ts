import { $, Test, DigitList } from '..'

export type Last_Spec = [
  /**
   * Can get the last digit of a digit list.
   */
  Test.Expect<$<DigitList.Last, ['1', '2', '3']>, '3'>,

  /**
   * Last of an empty list is "0".
   */
  Test.Expect<$<DigitList.Last, []>, '0'>,

  /**
   * Last of a single digit list is the digit.
   */
  Test.Expect<$<DigitList.Last, ['1']>, '1'>,

  /**
   * Getting the last digit of a non-list is an error.
   */
  // @ts-expect-error
  $<DigitList.Last, '1'>,

  /**
   * Getting the last digit of a non-digit list is an error.
   */
  // @ts-expect-error
  $<DigitList.Last, ['1', '2', '3', 'a']>
]
