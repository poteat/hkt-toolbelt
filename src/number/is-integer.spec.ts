import { $, Test, Number } from '..';

export type IsInteger_Spec = [
  /**
   * Can check if a number is an integer.
   */
  Test.Expect<$<Number.IsInteger, 42>>,

  /**
   * Can check if a number is not an integer.
   */
  Test.Expect<$<Number.IsInteger, 42.42>, false>,

  /**
   * Can recognize negative integers.
   */
  Test.Expect<$<Number.IsInteger, -42>>,

  /**
   * Can recognize negative non-integers.
   */
  Test.Expect<$<Number.IsInteger, -42.42>, false>,

  /**
   * Can recognize zero.
   */
  Test.Expect<$<Number.IsInteger, 0>>,

  /**
   * Evaluates the 'number' type properly.
   */
  Test.Expect<$<Number.IsInteger, number>, false>,

  /**
   * Can recognize string-encoded integers.
   */
  Test.Expect<$<Number.IsInteger, '42'>>,

  /**
   * Can recognize string-encoded non-integers.
   */
  Test.Expect<$<Number.IsInteger, '42.42'>, false>,

  /**
   * Can recognize bigint integers.
   */
  Test.Expect<$<Number.IsInteger, 42n>>,

  /**
   * Hex strings are not integers.
   */
  Test.Expect<$<Number.IsInteger, '0x42'>, false>
];
