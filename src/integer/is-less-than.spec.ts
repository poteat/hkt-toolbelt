import { $, Integer, Test } from '..'

type IsLessThan_Spec = [
  /**
   * -4 is less than -3.
   */
  Test.Expect<$<$<Integer.IsLessThan, -3>, -4>>,

  /**
   * -3 is not less than -3.
   */
  Test.ExpectNot<$<$<Integer.IsLessThan, -3>, -3>>,

  /**
   * 2 is not less than -3.
   */
  Test.ExpectNot<$<$<Integer.IsLessThan, -3>, 2>>,

  /**
   * Running 'IsLessThan' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Integer.IsLessThan, boolean>, 2>>
]
