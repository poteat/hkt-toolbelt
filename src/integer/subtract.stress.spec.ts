import { $, Test, Integer, List } from '..'

type Subtract_Spec = [
  /**
   * Can subtract bigint literals.
   */
  Test.Expect<
    $<
      $<Integer.Subtract, -123456789012345678901234567890n>,
      -123456789012345678901234567890n
    >,
    0
  >,

  /**
   * Can subtract larger numbers.
   */
  Test.Expect<
    $<$<Integer.Subtract, 123456789012345678901234567890n>, -1>,
    123456789012345678901234567891n
  >,

  /**
   * Can use reduce to subtract over a list.
   */
  Test.Expect<
    $<$<$<List.Reduce, Integer.Subtract>, -10000>, [1, 2, 3, 4, 5]>,
    -10015
  >
]
