import { $, Test, Number } from '..';

export type Absolute_Spec = [
  /**
   * Can get the sign of a positive number.
   */
  Test.Expect<$<Number.Absolute, 42>, 42>,

  /**
   * Can get the sign of a negative number.
   */
  Test.Expect<$<Number.Absolute, -42>, 42>,

  /**
   * Can get the sign of zero.
   */
  Test.Expect<$<Number.Absolute, 0>, 0>,

  /**
   * Can get the sign of a positive floating point number.
   */
  Test.Expect<$<Number.Absolute, 42.42>, 42.42>,

  /**
   * Can get the sign of a negative floating point number.
   */
  Test.Expect<$<Number.Absolute, -42.42>, 42.42>
];
