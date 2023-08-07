import { $, Test, NaturalNumber } from '..';

type Subtract_Spec = [
  /**
   * Can subtract two numbers.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 456>, 123>, 333>,

  /**
   * Can subtract two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 168>, 123>, 45>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 1>, 1>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 0>, 123>, 0>,

  /**
   * Can subtract two empty lists.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 0>, 0>, 0>,

  /**
   * Can subtract a smaller number from a larger one.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 1000>, 1>, 999>,

  /**
   * Can subtract a number from itself.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 12>, 12>, 0>,

  /**
   * Can subtract zero.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 12>, 0>, 12>,

  /**
   * Can subtract natural numbers represented as strings.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, '456'>, '123'>, 333>,

  /**
   * Subtracting more than the first number results in zero.
   */
  Test.Expect<$<$<NaturalNumber.Subtract, 123>, 456>, 0>
];
