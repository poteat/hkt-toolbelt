import { $, Test, NaturalNumber } from ".."

type Modulo_Spec = [
  /**
   * 0 % 0 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 0>, 0>, 0>,

  /**
   * 10 % 2 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 2>, 10>, 0>,

  /**
   * 123 % 17 = 4.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 17>, 123>, 4>,

  /**
   * 123 % 1 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 1>, 123>, 0>,

  /**
   * 123 % 123 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 123>, 123>, 0>,

  /**
   * 100 % 25 = 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 25>, 100>, 0>,

  /**
   * 100 % 50 = 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 50>, 100>, 0>,

  /**
   * 100 % 75 = 25.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 75>, 100>, 25>,

  /**
   * 100 % 99 = 1.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 99>, 100>, 1>
]
