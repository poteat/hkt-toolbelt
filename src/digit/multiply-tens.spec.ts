import { $, Test, Digit } from '..'

type Multiply_Spec = [
  /**
   * 2 * 2 = 04
   */
  Test.Expect<$<$<Digit.MultiplyTens, '2'>, '2'>, '0'>,

  /**
   * 2 * 3 = 06
   */
  Test.Expect<$<$<Digit.MultiplyTens, '2'>, '3'>, '0'>,

  /**
   * 9 * 9 = 81
   */
  Test.Expect<$<$<Digit.MultiplyTens, '9'>, '9'>, '8'>,

  /**
   * 5 * 5 = 25
   */
  Test.Expect<$<$<Digit.MultiplyTens, '5'>, '5'>, '2'>,

  /**
   * 5 * 3 = 15
   */
  Test.Expect<$<$<Digit.MultiplyTens, '5'>, '3'>, '1'>,

  /**
   * 5 * 4 = 20
   */
  Test.Expect<$<$<Digit.MultiplyTens, '5'>, '4'>, '2'>,

  /**
   * 4 * 5 = 20
   */
  Test.Expect<$<$<Digit.MultiplyTens, '4'>, '5'>, '2'>
]
