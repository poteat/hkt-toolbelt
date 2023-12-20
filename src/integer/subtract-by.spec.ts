import { $, Test, Integer } from '..'

type SubtractBy_Spec = [
  /**
   * Can subtract two numbers.
   */
  Test.Expect<$<$<Integer.SubtractBy, 123>, 456>, 333>,
  Test.Expect<$<$<Integer.SubtractBy, 123>, -456>, -579>,
  Test.Expect<$<$<Integer.SubtractBy, -123>, 456>, 579>,
  Test.Expect<$<$<Integer.SubtractBy, -123>, -456>, -333>,

  /**
   * Can subtract two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<Integer.SubtractBy, 123>, 168>, 45>,
  Test.Expect<$<$<Integer.SubtractBy, 123>, -168>, -291>,
  Test.Expect<$<$<Integer.SubtractBy, -123>, 168>, 291>,
  Test.Expect<$<$<Integer.SubtractBy, -123>, -168>, -45>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<Integer.SubtractBy, 1>, 1>, 0>,
  Test.Expect<$<$<Integer.SubtractBy, -1>, -1>, 0>,

  /**
   * Can subtract from zero.
   */
  Test.Expect<$<$<Integer.SubtractBy, 123>, 0>, -123>,
  Test.Expect<$<$<Integer.SubtractBy, -123>, 0>, 123>,

  /**
   * Can subtract zero.
   */
  Test.Expect<$<$<Integer.SubtractBy, 0>, 12>, 12>,
  Test.Expect<$<$<Integer.SubtractBy, 0>, -12>, -12>,

  /**
   * Can subtract two empty lists.
   */
  Test.Expect<$<$<Integer.SubtractBy, 0>, 0>, 0>,

  /**
   * Can subtract a smaller number from a larger one.
   */
  Test.Expect<$<$<Integer.SubtractBy, 1>, 1000>, 999>,
  Test.Expect<$<$<Integer.SubtractBy, 1>, -1000>, -1001>,

  /**
   * Can subtract a number from itself.
   */
  Test.Expect<$<$<Integer.SubtractBy, 12>, 12>, 0>,
  Test.Expect<$<$<Integer.SubtractBy, -12>, -12>, 0>,

  /**
   * Can handle carrying.
   */
  Test.Expect<$<$<Integer.SubtractBy, 1>, -9999>, -10000>,
  Test.Expect<$<$<Integer.SubtractBy, -1>, 9999>, 10000>,

  /**
   * Can subtract integeres represented as strings.
   */
  Test.Expect<$<$<Integer.SubtractBy, '123'>, '456'>, 333>,
  Test.Expect<$<$<Integer.SubtractBy, '-123'>, '-456'>, -333>
]
