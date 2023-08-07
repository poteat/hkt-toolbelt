import { $, Test, NaturalNumber } from '..'

type Multiply_Spec = [
  /**
   * 2 * 2 = 4
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 2>, 2>, 4>,

  /**
   * 3 * 3 = 9
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 3>, 3>, 9>,

  /**
   * 4 * 4 = 16
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 4>, 4>, 16>,

  /**
   * 99 * 99 = 9801
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 99>, 99>, 9801>,

  /**
   * 100 * 100 = 10000
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 100>, 100>, 10000>,

  /**
   * 999 * 0 = 0
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 999>, 0>, 0>,

  /**
   * 101 * 101 = 10201
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 101>, 101>, 10201>,

  /**
   * 0 * 0 = 0
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 0>, 0>, 0>
]
