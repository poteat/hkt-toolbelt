import { $, Test, NaturalNumber } from "..";

type Increment_Spec = [
  /**
   * Can increment bigint literals.
   */
  Test.Expect<
    $<NaturalNumber.Increment, 999999999999999999999n>,
    1000000000000000000000n
  >
];
