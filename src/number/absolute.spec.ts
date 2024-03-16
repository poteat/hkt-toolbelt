import { $, Test, Number } from '..'

export type Absolute_Spec = [
  /**
   * Can get the absolute value of a positive number.
   */
  Test.Expect<$<Number.Absolute, 42>, 42>,

  /**
   * Can get the absolute value of a negative number.
   */
  Test.Expect<$<Number.Absolute, -42>, 42>,

  /**
   * Can get the absolute value of zero.
   */
  Test.Expect<$<Number.Absolute, 0>, 0>,

  /**
   * Can get the absolute value of a positive floating point number.
   */
  Test.Expect<$<Number.Absolute, 42.42>, 42.42>,

  /**
   * Can get the absolute value of a negative floating point number.
   */
  Test.Expect<$<Number.Absolute, -42.42>, 42.42>,

  /**
   * Can get the absolute value of a negative floating point number encoded as a string.
   */
  Test.Expect<$<Number.Absolute, '-42.42'>, 42.42>,

  /**
   * Can get the absolute value of a bigint.
   */
  Test.Expect<$<Number.Absolute, -123456789123456789n>, 123456789123456789n>
]
