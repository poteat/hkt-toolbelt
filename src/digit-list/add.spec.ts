import { $, Test, DigitList } from '..'

type Add_Spec = [
  /**
   * Can add two numbers.
   */
  Test.Expect<
    $<$<DigitList.Add, ['1', '2', '3']>, ['4', '5', '6']>,
    ['5', '7', '9']
  >,

  /**
   * Can add two numbers with different lengths.
   */
  Test.Expect<
    $<$<DigitList.Add, ['1', '2', '3']>, ['4', '5']>,
    ['1', '6', '8']
  >,

  /**
   * Empty lists are treated as zero.
   */
  Test.Expect<$<$<DigitList.Add, []>, ['4', '5']>, ['4', '5']>,

  /**
   * Can add two empty lists.
   */
  Test.Expect<$<$<DigitList.Add, []>, []>, ['0']>,

  /**
   * Carry is propagated.
   */
  Test.Expect<$<$<DigitList.Add, ['9', '9', '9']>, ['1']>, ['1', '0', '0', '0']>
]
