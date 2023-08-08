import { $, Test, List } from '..'

type Times_Spec = [
  /**
   * N = 1000
   */
  Test.Expect<$<List.Times, 1000>[950], 950>
]
