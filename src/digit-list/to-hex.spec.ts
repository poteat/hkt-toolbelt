import { $, Test, DigitList } from '..'

type ToHex_Spec = [
  /**
   * Can convert a digit list to hex.
   */
  Test.Expect<$<DigitList.ToHex, ['1', '2', '3']>, [['7'], ['1', '1']]>,

  /**
   * Can convert a digit list to hex with a single digit.
   */
  Test.Expect<$<DigitList.ToHex, ['1']>, [['1']]>,

  /**
   * Can convert a digit list to hex zero.
   */
  Test.Expect<$<DigitList.ToHex, ['0']>, [['0']]>
]
