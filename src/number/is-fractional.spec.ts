import { $, Test, Number } from '..'

type IsFractional_Spec = [
  /**
   * Can check if a number is a fractional.
   */
  Test.Expect<$<Number.IsFractional, 42.42>>,

  /**
   * Can check if a number is not a fractional.
   */
  Test.Expect<$<Number.IsFractional, 42>, false>,

  /**
   * Can recognize negative fractions.
   */
  Test.Expect<$<Number.IsFractional, -42.42>>,

  /**
   * Can recognize negative non-fractions.
   */
  Test.Expect<$<Number.IsFractional, -42>, false>,

  /**
   * Can recognize zero.
   */
  Test.Expect<$<Number.IsFractional, 0>, false>,

  /**
   * Evaluates the 'number' type properly.
   */
  Test.Expect<$<Number.IsFractional, number>, false>
]
