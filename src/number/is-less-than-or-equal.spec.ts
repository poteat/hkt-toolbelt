import { $, Number, Test } from '..'

type IsLessThanOrEqual_Spec = [
  /**
   * -3.1 is less than or equal to -3.
   */
  Test.Expect<$<$<Number.IsLessThanOrEqual, -3>, -3.1>>,

  /**
   * -3 is less than or equal to -3.
   */
  Test.Expect<$<$<Number.IsLessThanOrEqual, -3>, -3>>,

  /**
   * 3.1 is not less than or equal to -3.
   */
  Test.ExpectNot<$<$<Number.IsLessThanOrEqual, -3>, 3.1>>,

  /**
   * Running 'IsLessThanOrEqual' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Number.IsLessThanOrEqual, boolean>, 2>>
]
