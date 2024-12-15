import { $, Test, Number } from '..'

export type Negate_Spec = [
  /**
   * Can get the sign of a positive number.
   */
  Test.Expect<$<Number.Negate, 42>, -42>,

  /**
   * Can get the sign of a negative number.
   */
  Test.Expect<$<Number.Negate, -42>, 42>,

  /**
   * Can get the sign of zero.
   */
  Test.Expect<$<Number.Negate, 0>, 0>,

  /**
   * Can get the sign of a positive floating point number.
   */
  Test.Expect<$<Number.Negate, 42.42>, -42.42>,

  /**
   * Can get the sign of a negative floating point number.
   */
  Test.Expect<$<Number.Negate, -42.42>, 42.42>,

  /**
   * The negation of a number is also a generic number.
   */
  Test.Expect<$<Number.Negate, number>, number>
]

it('should return the negation of a number', () => {
  expect(Number.negate(42)).toBe(-42)
})

it('should return the negation of a number', () => {
  expect(Number.negate(-42)).toBe(42)
})

it('should return the negation of a number', () => {
  expect(Number.negate(0)).toBe(0)
})
