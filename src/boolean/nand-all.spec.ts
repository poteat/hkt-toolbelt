import { $, Boolean, Test } from '..'

type NandAll_Spec = [
  /**
   * An empty array returns false.
   */
  Test.Expect<$<Boolean.NandAll, []>, false>,
  /**
   * An array of trues resolves to false
   */
  Test.Expect<$<Boolean.NandAll, [true, true, true]>, false>,
  /**
   * An array having false resolves to true
   */
  Test.Expect<$<Boolean.NandAll, [true, true, false]>, true>,
  /**
   * Running 'NandAll' on a non-boolean type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Boolean.NandAll, true>, number>>
]
