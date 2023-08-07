import { $, Test, NaturalNumber } from '..'

type IsOdd_Spec = [
  /**
   * 1 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 1>, true>,

  /**
   * 2 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 2>, false>,

  /**
   * 3 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 3>, true>,

  /**
   * 4 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 4>, false>,

  /**
   * 5 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 5>, true>,

  /**
   * 6 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 6>, false>,

  /**
   * 7 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 7>, true>,

  /**
   * 8 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 8>, false>,

  /**
   * 9 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 9>, true>,

  /**
   * 10 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 10>, false>,

  /**
   * 11 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 11>, true>,

  /**
   * 12 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 12>, false>,

  /**
   * 13 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 13>, true>,

  /**
   * 14 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 14>, false>,

  /**
   * 15 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 15>, true>,

  /**
   * 16 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 16>, false>,

  /**
   * 17 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 17>, true>,

  /**
   * 18 is even
   */
  Test.Expect<$<NaturalNumber.IsOdd, 18>, false>,

  /**
   * 19 is odd
   */
  Test.Expect<$<NaturalNumber.IsOdd, 19>, true>
]
