import { $, Test, Integer } from '..'

type IsOdd_Spec = [
  /**
   * 1 is odd
   */
  Test.Expect<$<Integer.IsOdd, -1>, true>,

  /**
   * 2 is even
   */
  Test.Expect<$<Integer.IsOdd, -2>, false>,

  /**
   * 3 is odd
   */
  Test.Expect<$<Integer.IsOdd, -3>, true>,

  /**
   * 4 is even
   */
  Test.Expect<$<Integer.IsOdd, -4>, false>,

  /**
   * 5 is odd
   */
  Test.Expect<$<Integer.IsOdd, -5>, true>,

  /**
   * 6 is even
   */
  Test.Expect<$<Integer.IsOdd, 6>, false>,

  /**
   * 7 is odd
   */
  Test.Expect<$<Integer.IsOdd, 7>, true>,

  /**
   * 8 is even
   */
  Test.Expect<$<Integer.IsOdd, 8>, false>,

  /**
   * 9 is odd
   */
  Test.Expect<$<Integer.IsOdd, 9>, true>,

  /**
   * 10 is even
   */
  Test.Expect<$<Integer.IsOdd, 10>, false>,

  /**
   * 11 is odd
   */
  Test.Expect<$<Integer.IsOdd, -11>, true>,

  /**
   * 12 is even
   */
  Test.Expect<$<Integer.IsOdd, -12>, false>,

  /**
   * 13 is odd
   */
  Test.Expect<$<Integer.IsOdd, -13>, true>,

  /**
   * 14 is even
   */
  Test.Expect<$<Integer.IsOdd, -14>, false>,

  /**
   * 15 is odd
   */
  Test.Expect<$<Integer.IsOdd, -15>, true>,

  /**
   * 16 is even
   */
  Test.Expect<$<Integer.IsOdd, 16>, false>,

  /**
   * 17 is odd
   */
  Test.Expect<$<Integer.IsOdd, 17>, true>,

  /**
   * 18 is even
   */
  Test.Expect<$<Integer.IsOdd, 18>, false>,

  /**
   * 19 is odd
   */
  Test.Expect<$<Integer.IsOdd, 19>, true>
]
