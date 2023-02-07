import { $, Test, NaturalNumber, List } from "..";

type Subtract_Spec = [
  /**
   * Can subtract bigint literals.
   */
  Test.Expect<
    $<
      $<NaturalNumber.Subtract, 123456789012345678901234567890n>,
      123456789012345678901234567890n
    >,
    0
  >,

  /**
   * Can subtract larger numbers.
   */
  Test.Expect<
    $<$<NaturalNumber.Subtract, 123456789012345678901234567890n>, 1>,
    123456789012345678901234567889n
  >,

  /**
   * Can use reduce to subtract over a list.
   */
  Test.Expect<
    $<$<$<List.Reduce, NaturalNumber.Subtract>, 10000>, [1, 2, 3, 4, 5]>,
    9985
  >
];
