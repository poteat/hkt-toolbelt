import { $, Test, Conditional, Digit, Union } from '..';

type Digit_Spec = [
  /**
   * "0" is assignable to a digit.
   */
  Test.Expect<$<$<Conditional.Extends, Digit.Digit>, Digit.Zero>>,

  /**
   * There are ten digits.
   */
  Test.Expect<$<Union.Length, Digit.Digit>, 10>
];
