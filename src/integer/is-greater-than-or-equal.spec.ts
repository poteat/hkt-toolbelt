import { $, Integer, Test } from '..'

type IsGreaterThanOrEqual_Spec = [
  /**
   * 4 is greater than or equal to -3.
   */
  Test.Expect<$<$<Integer.IsGreaterThanOrEqual, -3>, 4>>,

  /**
   * -4 is not greater than or equal to -3.
   */
  Test.ExpectNot<$<$<Integer.IsGreaterThanOrEqual, -3>, -4>>,

  /**
   * -3 is greater than or equal to -3.
   */
  Test.Expect<$<$<Integer.IsGreaterThanOrEqual, -3>, -3>>,

  /**
   * Running 'IsGreaterThanOrEqual' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Integer.IsGreaterThanOrEqual, boolean>, 2>>
]
