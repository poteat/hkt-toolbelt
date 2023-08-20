import { $, Test, DigitList } from '..'

type FromString_Spec = [
  /**
   * When given a string "1234", it should be converted to ['1', '2', '3', '4']
   */
  Test.Expect<$<DigitList.FromString, '1234'>, ['1', '2', '3', '4']>,

  /**
   * When given an empty string, it should return ['0']
   */
  Test.Expect<$<DigitList.FromString, ''>, ['0']>,

  /**
   * When given a string with leading zeros, it should ignore them
   */
  Test.Expect<$<DigitList.FromString, '00123'>, ['1', '2', '3']>
]
