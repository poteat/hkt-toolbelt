import { $, Test, NaturalNumber } from '..';

type IsEven_Spec = [
  /**
   * 0 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 0>, true>,

  /**
   * 1 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 1>, false>,

  /**
   * 2 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 2>, true>,

  /**
   * 3 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 3>, false>,

  /**
   * 4 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 4>, true>,

  /**
   * 5 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 5>, false>,

  /**
   * 6 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 6>, true>,

  /**
   * 7 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 7>, false>,

  /**
   * 8 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 8>, true>,

  /**
   * 9 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 9>, false>,

  /**
   * 10 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 10>, true>,

  /**
   * 11 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 11>, false>,

  /**
   * 12 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 12>, true>,

  /**
   * 13 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 13>, false>,

  /**
   * 14 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 14>, true>,

  /**
   * 15 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 15>, false>,

  /**
   * 16 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 16>, true>,

  /**
   * 17 is odd
   */
  Test.Expect<$<NaturalNumber.IsEven, 17>, false>,

  /**
   * 18 is even
   */
  Test.Expect<$<NaturalNumber.IsEven, 18>, true>
];
