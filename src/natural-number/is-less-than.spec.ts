import { $, NaturalNumber, Test } from '..';

type IsLessThan_Spec = [
  /**
   * 2 is less than 3.
   */
  Test.Expect<$<$<NaturalNumber.IsLessThan, 3>, 2>>,

  /**
   * 3 is not less than 3.
   */
  Test.ExpectNot<$<$<NaturalNumber.IsLessThan, 3>, 3>>,

  /**
   * 4 is not less than 3.
   */
  Test.ExpectNot<$<$<NaturalNumber.IsLessThan, 3>, 4>>,

  /**
   * Running 'IsLessThan' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<NaturalNumber.IsLessThan, boolean>, 2>>
];
