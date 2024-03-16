import { $, Number, Test } from '..'

type IsGreaterThan_Spec = [
  /**
   * -2.9 is greater than -3.
   */
  Test.Expect<$<$<Number.IsGreaterThan, -3>, -2.9>>,

  /**
   * -3.1 is not greater than -3.
   */
  Test.ExpectNot<$<$<Number.IsGreaterThan, -3>, -3.1>>,

  /**
   * -3 is not greater than -3.
   */
  Test.ExpectNot<$<$<Number.IsGreaterThan, -3>, -3>>,

  /**
   * Running 'IsGreaterThan' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Number.IsGreaterThan, boolean>, 2>>
]
