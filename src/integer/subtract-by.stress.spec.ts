import { $, Test, Integer, List } from '..'

type SubtractBy_Spec = [
  /**
   * Can subtract bigint literals.
   */
  Test.Expect<
    $<
      $<Integer.SubtractBy, -123456789012345678901234567890n>,
      -123456789012345678901234567890n
    >,
    0
  >,

  /**
   * Can subtract larger numbers.
   */
  Test.Expect<
    $<$<Integer.SubtractBy, 123456789012345678901234567891n>, -1>,
    123456789012345678901234567890n
  >,

  /**
   * Can use reduce to subtract over a list.
   */
  Test.Expect<
    $<$<$<List.Reduce, Integer.SubtractBy>, 10000>, [1, 2, 3, 4, 5]>,
    -9997
  >
]
