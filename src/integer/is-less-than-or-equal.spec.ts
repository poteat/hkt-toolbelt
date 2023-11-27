import { $, Integer, Test } from '..'

type IsLessThanOrEqual_Spec = [
  /**
   * -3 is less than -2.
   */
  Test.Expect<$<$<Integer.IsLessThanOrEqual, -2>, -3>>,

  /**
   * -3 is not less than -3.
   */
  Test.Expect<$<$<Integer.IsLessThanOrEqual, -3>, -3>>,

  /**
   * 4 is not less than -3.
   */
  Test.ExpectNot<$<$<Integer.IsLessThanOrEqual, -3>, 4>>,

  /**
   * Running 'IsLessThanOrEqual' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Integer.IsLessThanOrEqual, boolean>, 2>>
]
