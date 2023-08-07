import { $, Test, NaturalNumber } from '..';

type Increment_Spec = [
  /**
   * Can increment a natural number of zero.
   */
  Test.Expect<$<NaturalNumber.Increment, 0>, 1>,

  /**
   * Can increment a natural number of one.
   */
  Test.Expect<$<NaturalNumber.Increment, 1>, 2>,

  /**
   * Can increment a natural number of 10.
   */
  Test.Expect<$<NaturalNumber.Increment, 10>, 11>,

  /**
   * Can increment a natural number of 9999.
   */
  Test.Expect<$<NaturalNumber.Increment, 9999>, 10000>,

  /**
   * We emit 'never' if the input is not a natural number.
   */
  Test.Expect<$<NaturalNumber.Increment, -1>, never>
];
