import { $, Test, Integer } from '..'

type Compare_Spec = [
  /**
   * Can compare two numbers.
   */
  Test.Expect<$<$<Integer.Compare, 123>, 123>, 0>,

  Test.Expect<$<$<Integer.Compare, 123>, 321>, -1>,

  Test.Expect<$<$<Integer.Compare, 321>, 123>, 1>,

  /**
   * Can compare two numbers with negative signs.
   */
  Test.Expect<$<$<Integer.Compare, 123>, -123>, 1>,

  Test.Expect<$<$<Integer.Compare, -321>, 123>, -1>,

  Test.Expect<$<$<Integer.Compare, -123>, -321>, 1>,

  Test.Expect<$<$<Integer.Compare, -321>, -123>, -1>,

  Test.Expect<$<$<Integer.Compare, -123>, 0>, -1>,

  Test.Expect<$<$<Integer.Compare, 0>, -123>, 1>,

  /**
   * Can compare two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<Integer.Compare, 168>, 123>, 1>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<Integer.Compare, 1>, 1>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<Integer.Compare, 0>, 123>, -1>,

  /**
   * Can compare a larger number to a smaller one.
   */
  Test.Expect<$<$<Integer.Compare, 1000>, 1>, 1>,

  /**
   * Can compare a smaller number to a larger one.
   */
  Test.Expect<$<$<Integer.Compare, 1>, 1000>, -1>,

  /**
   * Can compare a number from itself.
   */
  Test.Expect<$<$<Integer.Compare, 12>, 12>, 0>,

  /**
   * Can compare zero.
   */
  Test.Expect<$<$<Integer.Compare, 12>, 0>, 1>,

  /**
   * Can compare zero from zero.
   */
  Test.Expect<$<$<Integer.Compare, 0>, 0>, 0>,

  /**
   * Can compare large numbers.
   */
  Test.Expect<$<$<Integer.Compare, 123456789>, 1>, 1>
]
