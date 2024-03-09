import { $, Boolean, Test } from '..'
type OrAll_Spec = [
  /**
   * An empty array resolves to false.
   */
  Test.Expect<$<Boolean.XnorAll, []>, false>,
  /**
   * An array of odd number of trues  resolves to true
   */
  Test.Expect<$<Boolean.XnorAll, [true, true, true]>, true>,
  /**
   * An array with even number of trues resolves to false
   */
  Test.Expect<$<Boolean.XnorAll, [true, true, false]>, false>,
  /**
   * Running 'OrAll' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Boolean.XnorAll, true>, number>>
]
