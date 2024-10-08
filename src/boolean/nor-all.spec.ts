import { $, Boolean, Test } from '..'
type NorAll_Spec = [
  /**
   * An empty array resolves to false.
   */
  Test.Expect<$<Boolean.NorAll, []>, false>,
  /**
   * An array of trues resolves to false
   */
  Test.Expect<$<Boolean.NorAll, [true, true, true]>, false>,
  /**
   * An array of mixed booleans resolves to false
   */
  Test.Expect<$<Boolean.NorAll, [true, true, false]>, false>,
  /**
   * An array of all falses resolves to true
   */
  Test.Expect<$<Boolean.NorAll, [false, false, false]>, true>,
  /**
   * Running 'NorAll' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Boolean.NorAll, true>, number>>
]
