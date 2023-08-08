import { $, Test, List } from '..'

type Repeat_Spec = [
  /**
   * N = 100
   */
  Test.Expect<$<$<List.Repeat, 100>, '0'>[99], '0'>,

  /**
   * N = 2137
   */
  Test.Expect<$<$<List.Repeat, 2137>, '0'>[2136], '0'>
]
