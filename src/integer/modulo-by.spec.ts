import { $, Test, Integer } from '..'

type Modulo_Spec = [
  /**
   * 0 % 0 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.ModuloBy, 0>, 0>, 0>,

  /**
   * 10 % 2 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.ModuloBy, 2>, 10>, 0>,

  /**
   * 123 % 17 = 4.
   */
  Test.Expect<$<$<Integer.ModuloBy, 17>, 123>, 4>,
  Test.Expect<$<$<Integer.ModuloBy, -17>, 123>, -13>,
  Test.Expect<$<$<Integer.ModuloBy, 17>, -123>, 13>,
  Test.Expect<$<$<Integer.ModuloBy, -17>, -123>, -4>,

  /**
   * 123 % 1 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.ModuloBy, 1>, 123>, 0>,

  /**
   * 123 % 123 = 0. The remainder is 0.
   */
  Test.Expect<$<$<Integer.ModuloBy, 123>, 123>, 0>,

  /**
   * 100 % 25 = 0.
   */
  Test.Expect<$<$<Integer.ModuloBy, 25>, 100>, 0>,

  /**
   * 100 % 50 = 0.
   */
  Test.Expect<$<$<Integer.ModuloBy, 50>, 100>, 0>,

  /**
   * 100 % 75 = 25.
   */
  Test.Expect<$<$<Integer.ModuloBy, 75>, 100>, 25>,
  Test.Expect<$<$<Integer.ModuloBy, -75>, 100>, -50>,
  Test.Expect<$<$<Integer.ModuloBy, 75>, -100>, 50>,
  Test.Expect<$<$<Integer.ModuloBy, -75>, -100>, -25>,

  /**
   * 100 % 99 = 1.
   */
  Test.Expect<$<$<Integer.ModuloBy, 99>, 100>, 1>,
  Test.Expect<$<$<Integer.ModuloBy, -99>, 100>, -98>,
  Test.Expect<$<$<Integer.ModuloBy, 99>, -100>, 98>,
  Test.Expect<$<$<Integer.ModuloBy, -99>, -100>, -1>
]
