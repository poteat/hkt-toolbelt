import { $, Test, DigitList } from '..'

type ToString_Spec = [
  /**
   * Can convert a digit list to a string.
   */
  Test.Expect<$<DigitList.ToString, ['1', '2', '3']>, '123'>,

  /**
   * Can convert a single digit list to a string.
   */
  Test.Expect<$<DigitList.ToString, ['1']>, '1'>,

  /**
   * Can convert an empty digit list to a string.
   */
  Test.Expect<$<DigitList.ToString, []>, '0'>,

  /**
   * Converting a non-digit list is an error.
   */
  // @ts-expect-error
  $<DigitList.ToString, ['1', '2', '3', 'a']>
]
