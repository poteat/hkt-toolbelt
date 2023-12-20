import { $, Test, Integer } from '..'

type Increment_Spec = [
  /**
   * Can increment a natural number of zero.
   */
  Test.Expect<$<Integer.Increment, 0>, 1>,

  /**
   * Can increment a natural number of one.
   */
  Test.Expect<$<Integer.Increment, 1>, 2>,

  /**
   * Can increment a negative number of 10.
   */
  Test.Expect<$<Integer.Increment, -10>, -9>,

  /**
   * We emit 'never' if the input is not an integer.
   */
  Test.Expect<$<Integer.Decrement, 1.5>, never>,

  /**
   * Can increment 9999 and -9999.
   */
  Test.Expect<$<Integer.Increment, 9999>, 10000>,
  Test.Expect<$<Integer.Increment, -9999>, -9998>
]
