import { $, Test, Digit } from '..';

type Multiply_Spec = [
  /**
   * 2 * 2 = 4
   */
  Test.Expect<$<$<Digit.Multiply, '2'>, '2'>, '4'>,

  /**
   * 2 * 3 = 6
   */
  Test.Expect<$<$<Digit.Multiply, '2'>, '3'>, '6'>,

  /**
   * Anything times one is itself.
   */
  Test.Expect<$<$<Digit.Multiply, '2'>, '1'>, '2'>,

  /**
   * Anything times zero is zero.
   */
  Test.Expect<$<$<Digit.Multiply, '2'>, '0'>, '0'>,

  /**
   * 9*9 = 81 which wraps to 1.
   */
  Test.Expect<$<$<Digit.Multiply, '9'>, '9'>, '1'>,

  /**
   * 5*3 = 15 which wraps to 5.
   */
  Test.Expect<$<$<Digit.Multiply, '5'>, '3'>, '5'>
];
