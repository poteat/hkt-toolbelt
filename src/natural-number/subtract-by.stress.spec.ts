import { $, Test, NaturalNumber, List } from '..'

type SubtractBy_Spec = [
  /**
   * Can subtract bigint literals.
   */
  Test.Expect<
    $<
      $<NaturalNumber.SubtractBy, 123456789012345678901234567890n>,
      123456789012345678901234567890n
    >,
    0
  >,

  /**
   * Can subtract larger numbers.
   */
  Test.Expect<
    $<$<NaturalNumber.SubtractBy, 1>, 123456789012345678901234567890n>,
    123456789012345678901234567889n
  >,

  /**
   * Can use reduce to subtract over a list.
   */
  Test.Expect<
    $<$<$<List.Reduce, NaturalNumber.SubtractBy>, 10>, [11, 21, 31, 21]>,
    10
  >
]
