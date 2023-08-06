import { $, Test, NaturalNumber } from "..";

type SubtractBy_Spec = [
  /**
   * Can subtract two numbers.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 123>, 456>, 333>,

  /**
   * Can subtract two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 123>, 168>, 45>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 1>, 1>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 123>, 0>, 0>,

  /**
   * Can subtract two empty lists.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 0>, 0>, 0>,

  /**
   * Can subtract a smaller number from a larger one.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 1>, 1000>, 999>,

  /**
   * Can subtract a number from itself.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 12>, 12>, 0>,

  /**
   * Can subtract zero.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 0>, 12>, 12>,

  /**
   * Can subtract natural numbers represented as strings.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, "123">, "456">, 333>,

  /**
   * Subtracting more than the first number results in zero.
   */
  Test.Expect<$<$<NaturalNumber.SubtractBy, 456>, 123>, 0>
];
