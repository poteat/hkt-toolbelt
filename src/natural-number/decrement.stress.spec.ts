import { $, Test, NaturalNumber } from '..';

type Decrement_Spec = [
  /**
   * Can decrement bigint literals.
   */
  Test.Expect<
    $<NaturalNumber.Decrement, 999999999999999999999n>,
    999999999999999999998n
  >
];
