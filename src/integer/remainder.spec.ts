import { $, Test, Integer } from '..'

type Remainder_Spec = [
  /**
   * 0 % 0 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.Remainder, 0>, 0>, 0>,

  /**
   * 10 % 2 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.Remainder, 10>, 2>, 0>,

  /**
   * 123 % 17 = 4.
   */
  Test.Expect<$<$<Integer.Remainder, 123>, 17>, 4>,
  Test.Expect<$<$<Integer.Remainder, 123>, -17>, -4>,
  Test.Expect<$<$<Integer.Remainder, -123>, 17>, -4>,
  Test.Expect<$<$<Integer.Remainder, -123>, -17>, 4>,

  /**
   * 123 % 1 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.Remainder, 123>, 1>, 0>,

  /**
   * 123 % 123 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.Remainder, 123>, 123>, 0>,

  /**
   * 100 % 25 = 0.
   */
  Test.Expect<$<$<Integer.Remainder, 100>, 25>, 0>,

  /**
   * 100 % 50 = 0.
   */
  Test.Expect<$<$<Integer.Remainder, 100>, 50>, 0>,

  /**
   * 100 % 75 = 25.
   */
  Test.Expect<$<$<Integer.Remainder, 100>, 75>, 25>,
  Test.Expect<$<$<Integer.Remainder, 100>, -75>, -25>,
  Test.Expect<$<$<Integer.Remainder, -100>, 75>, -25>,
  Test.Expect<$<$<Integer.Remainder, -100>, -75>, 25>,

  /**
   * 100 % 99 = 1.
   */
  Test.Expect<$<$<Integer.Remainder, 100>, 99>, 1>,
  Test.Expect<$<$<Integer.Remainder, 100>, -99>, -1>,
  Test.Expect<$<$<Integer.Remainder, -100>, 99>, -1>,
  Test.Expect<$<$<Integer.Remainder, -100>, -99>, 1>
]
