import { $, Test, Integer } from '..'

type Subtract_Spec = [
  /**
   * Can subtract two numbers.
   */
  Test.Expect<$<$<Integer.Subtract, 456>, 123>, 333>,
  Test.Expect<$<$<Integer.Subtract, -456>, 123>, -579>,
  Test.Expect<$<$<Integer.Subtract, 456>, -123>, 579>,
  Test.Expect<$<$<Integer.Subtract, -456>, -123>, -333>,

  /**
   * Can subtract two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<Integer.Subtract, 168>, 123>, 45>,
  Test.Expect<$<$<Integer.Subtract, -168>, 123>, -291>,
  Test.Expect<$<$<Integer.Subtract, 168>, -123>, 291>,
  Test.Expect<$<$<Integer.Subtract, -168>, -123>, -45>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<Integer.Subtract, 1>, 1>, 0>,
  Test.Expect<$<$<Integer.Subtract, -1>, -1>, 0>,

  /**
   * Can subtract from zero.
   */
  Test.Expect<$<$<Integer.Subtract, 0>, 123>, -123>,
  Test.Expect<$<$<Integer.Subtract, 0>, -123>, 123>,

  /**
   * Can subtract zero.
   */
  Test.Expect<$<$<Integer.Subtract, 12>, 0>, 12>,
  Test.Expect<$<$<Integer.Subtract, -12>, 0>, -12>,

  /**
   * Can subtract two empty lists.
   */
  Test.Expect<$<$<Integer.Subtract, 0>, 0>, 0>,

  /**
   * Can subtract a smaller number from a larger one.
   */
  Test.Expect<$<$<Integer.Subtract, 1000>, 1>, 999>,
  Test.Expect<$<$<Integer.Subtract, -1000>, 1>, -1001>,

  /**
   * Can subtract a number from itself.
   */
  Test.Expect<$<$<Integer.Subtract, 12>, 12>, 0>,
  Test.Expect<$<$<Integer.Subtract, -12>, -12>, 0>,

  /**
   * Can handle carrying.
   */
  Test.Expect<$<$<Integer.Subtract, -9999>, 1>, -10000>,
  Test.Expect<$<$<Integer.Subtract, 9999>, -1>, 10000>,

  /**
   * Can subtract integeres represented as strings.
   */
  Test.Expect<$<$<Integer.Subtract, '456'>, '123'>, 333>,
  Test.Expect<$<$<Integer.Subtract, '-456'>, '-123'>, -333>
]
