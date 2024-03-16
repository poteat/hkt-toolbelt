import { $, Integer, Test } from '..'

type IsGreaterThan_Spec = [
  /**
   * -2 is greater than -3.
   */
  Test.Expect<$<$<Integer.IsGreaterThan, -3>, -2>>,

  /**
   * -4 is not greater than -3.
   */
  Test.ExpectNot<$<$<Integer.IsGreaterThan, -3>, -4>>,

  /**
   * -3 is not greater than -3.
   */
  Test.ExpectNot<$<$<Integer.IsGreaterThan, -3>, -3>>,

  /**
   * Running 'IsGreaterThan' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Integer.IsGreaterThan, boolean>, 2>>
]
