import { $, Test, Integer } from '..'

type DivideBy_Spec = [
  /**
   * 0 / 0 = 0. The quotient is 0.
   */
  Test.Expect<$<$<Integer.DivideBy, 0>, 0>, 0>,

  /**
   * 10 / -2 = 5. The quotient is -5.
   */
  Test.Expect<$<$<Integer.DivideBy, -2>, 10>, -5>,

  /**
   * -123 / 17 results is -7.
   */
  Test.Expect<$<$<Integer.DivideBy, 17>, -123>, -7>,

  /**
   * -3922 / -2 = 1961.
   */
  Test.Expect<$<$<Integer.DivideBy, -2>, -3922>, 1961>,

  /**
   * 123 / 1 = 123. The quotient is 123.
   */
  Test.Expect<$<$<Integer.DivideBy, 1>, 123>, 123>,

  /**
   * 123 / -123 = -1. The quotient is -1.
   */
  Test.Expect<$<$<Integer.DivideBy, -123>, 123>, -1>,

  /**
   * 100 / 25 = 4.
   */
  Test.Expect<$<$<Integer.DivideBy, 25>, 100>, 4>,

  /**
   * -100 / -50 = 2.
   */
  Test.Expect<$<$<Integer.DivideBy, -50>, -100>, 2>,

  /**
   * -100 / 75 = -1.
   */
  Test.Expect<$<$<Integer.DivideBy, 75>, -100>, -1>,

  /**
   * 100 / -99 = -1.
   */
  Test.Expect<$<$<Integer.DivideBy, -99>, 100>, -1>
]
