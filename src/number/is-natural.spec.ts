import { $, Test, Number } from '..';

type IsNaturalNumber_Spec = [
  /**
   * Can check if a number is a natural number.
   */
  Test.Expect<$<Number.IsNatural, 42>>,

  /**
   * Can check if a number is not a natural number.
   */
  Test.Expect<$<Number.IsNatural, 42.42>, false>,

  /**
   * Can recognize negative numbers.
   */
  Test.Expect<$<Number.IsNatural, -42>, false>,

  /**
   * Can recognize negative fractional numbers.
   */
  Test.Expect<$<Number.IsNatural, -42.42>, false>,

  /**
   * Zero is a natural number.
   */
  Test.Expect<$<Number.IsNatural, 0>>,

  /**
   * Evaluates the 'number' type properly.
   */
  Test.Expect<$<Number.IsNatural, number>, false>,

  /**
   * Invalid strings are not natural numbers.
   */
  Test.Expect<$<Number.IsNatural, 'foo'>, false>,

  /**
   * Empty strings are not natural numbers.
   */
  Test.Expect<$<Number.IsNatural, ''>, false>,

  /**
   * The 'string' type is not a natural number.
   */
  Test.Expect<$<Number.IsNatural, string>, false>
];
