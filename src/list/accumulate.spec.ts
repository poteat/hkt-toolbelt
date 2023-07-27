import { $, Test, List, NaturalNumber } from ".."

type Accumulate_Spec = [
  /**
   * Can correctly produce a prefix sum array.
   */
  Test.Expect<
    $<$<$<List.Accumulate, NaturalNumber.Add>, 0>, [1, 2, 3, 4, 5]>,
    [1, 3, 6, 10, 15]
  >,
  Test.Expect<
    $<$<$<List.Accumulate, NaturalNumber.Add>, 100>, [1, 2, 3, 4, 5]>,
    [101, 103, 106, 110, 115]
  >
]
