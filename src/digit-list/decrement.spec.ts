import { $, Test, DigitList } from '..'

type Decrement_Spec = [
  /**
   * Decrementing zero should result in zero.
   */
  Test.Expect<$<DigitList.Decrement, ['0']>, ['0']>,

  /**
   * Decrementing an empty zero should result in zero.
   */
  Test.Expect<$<DigitList.Decrement, []>, ['0']>,

  /**
   * Can decrement one.
   */
  Test.Expect<$<DigitList.Decrement, ['1']>, ['0']>,
  /**
   * Can decrement two.
   */
  Test.Expect<$<DigitList.Decrement, ['2']>, ['1']>,
  /**
   * Can decrement 10.
   */
  Test.Expect<$<DigitList.Decrement, ['1', '0']>, ['9']>,
  /**
   * Can decrement 11.
   */
  Test.Expect<$<DigitList.Decrement, ['1', '1']>, ['1', '0']>,
  /**
   * Can decrement 100.
   */
  Test.Expect<$<DigitList.Decrement, ['1', '0', '0']>, ['9', '9']>,
  /**
   * Can decrement 9999.
   */
  Test.Expect<
    $<DigitList.Decrement, ['9', '9', '9', '9']>,
    ['9', '9', '9', '8']
  >,
  /**
   * Can decrement 10000.
   */
  Test.Expect<
    $<DigitList.Decrement, ['1', '0', '0', '0', '0']>,
    ['9', '9', '9', '9']
  >
]
