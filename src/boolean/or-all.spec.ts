import { $, Boolean, Test } from '..'
type OrAll_Spec = [
  /**
   * An empty array or an array of one element always returns false.
   */
  Test.Expect<$<Boolean.OrAll, []>, false>,
  /**
   * An array of trues should resolves to true
   */
  Test.Expect<$<Boolean.OrAll, [true, true, true]>, true>,
  /**
   * An array with mixed booleans should resolves to true
   */
  Test.Expect<$<Boolean.OrAll, [true, true, false]>, true>,
  /**
   * Running 'OrAll' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Boolean.OrAll, true>, number>>
]
