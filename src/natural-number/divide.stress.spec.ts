import { $, Test, NaturalNumber } from '..';

type Divide_Spec = [
  /**
   * Can perform complicated division.
   */
  Test.Expect<
    $<
      $<
        NaturalNumber.Divide,
        123456789123456789123456789123456789123456789123456789123456789123456789123456789123456789n
      >,
      5
    >,
    24691357824691357824691357824691357824691357824691357824691357824691357824691357824691357n
  >
];
