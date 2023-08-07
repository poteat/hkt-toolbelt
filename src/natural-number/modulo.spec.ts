import { $, Test, NaturalNumber } from '..';

type Modulo_Spec = [
  /**
   * 0 % 0 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 0>, 0>, 0>,

  /**
   * 10 % 2 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 10>, 2>, 0>,

  /**
   * 123 % 17 = 4.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 123>, 17>, 4>,

  /**
   * 123 % 1 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 123>, 1>, 0>,

  /**
   * 123 % 123 = 0. The remainder is 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 123>, 123>, 0>,

  /**
   * 100 % 25 = 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 100>, 25>, 0>,

  /**
   * 100 % 50 = 0.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 100>, 50>, 0>,

  /**
   * 100 % 75 = 25.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 100>, 75>, 25>,

  /**
   * 100 % 99 = 1.
   */
  Test.Expect<$<$<NaturalNumber.Modulo, 100>, 99>, 1>
];
