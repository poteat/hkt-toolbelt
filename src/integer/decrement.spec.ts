import { $, Test, Integer } from "..";

type Decrement_Spec = [
  /**
   * Can decrement a natural number of zero.
   */
  Test.Expect<$<Integer.Decrement, 0>, 0>,

  /**
   * Can decrement a natural number of one.
   */
  Test.Expect<$<Integer.Decrement, 1>, 0>,

  /**
   * Can decrement 10 and -10.
   */
  Test.Expect<$<Integer.Decrement, 10>, 9>,
  Test.Expect<$<Integer.Decrement, -10>, -11>,

  /**
   * Can decrement 9999 and -9999.
   */
  Test.Expect<$<Integer.Decrement, 9999>, 9998>,
  Test.Expect<$<Integer.Decrement, -9999>, -10000>,

  /**
   * We emit 'never' if the input is not an integer.
   */
  Test.Expect<$<Integer.Decrement, 1.5>, never>,

  /**
   * Can decrement bigint literals.
   */
  Test.Expect<
    $<Integer.Decrement, 999999999999999999999n>,
    999999999999999999998n
  >
];
