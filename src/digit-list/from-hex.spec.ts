import { $, Test, DigitList } from '..'

type FromHex_Spec = [
  /**
   * Can convert a list of hex digits to a list of decimal digits.
   */
  Test.Expect<$<DigitList.FromHex, [['7'], ['1', '1']]>, ['1', '2', '3']>,

  /**
   * Can convert a list of hex digits to a list of decimal digits.
   */
  Test.Expect<$<DigitList.FromHex, [['1', '1'], ['1', '1']]>, ['1', '8', '7']>,

  /**
   * Can convert zero.
   */
  Test.Expect<$<DigitList.FromHex, [['0']]>, ['0']>
]
