import { $, List, Test } from '..'

type Repeat_Spec = [
  /**
   * N = 100
   */
  Test.Expect<$<$<List.Repeat, '0'>, 100>[99], '0'>,

  /**
   * N = 2137
   */
  Test.Expect<$<$<List.Repeat, '0'>, 2137>[2136], '0'>
]
