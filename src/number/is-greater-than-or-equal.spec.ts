import { $, Number, Test } from '..'

type IsGreaterThanOrEqual_Spec = [
  /**
   * -2.9 is greater than or equal to -3.
   */
  Test.Expect<$<$<Number.IsGreaterThanOrEqual, -3>, -2.9>>,

  /**
   * -3.1 is not greater than or equal to -3.
   */
  Test.ExpectNot<$<$<Number.IsGreaterThanOrEqual, -3>, -3.1>>,

  /**
   * -3 is greater than or equal to -3.
   */
  Test.Expect<$<$<Number.IsGreaterThanOrEqual, -3>, -3>>,

  /**
   * Running 'IsGreaterThanOrEqual' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Number.IsGreaterThanOrEqual, boolean>, 2>>
]
