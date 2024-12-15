import { $, Test, Integer } from '..'

type Negate_Spec = [
  /**
   * Can get the sign of a positive number.
   */
  Test.Expect<$<Integer.Negate, 42>, -42>,

  /**
   * Can get the sign of a negative number.
   */
  Test.Expect<$<Integer.Negate, -42>, 42>,

  /**
   * Can get the sign of zero.
   */
  Test.Expect<$<Integer.Negate, 0>, 0>,

  /**
   * Evaluating the 'number' type properly.
   */
  Test.Expect<$<Integer.Negate, number>, number>
]

it('should return the negation of a number', () => {
  expect(Integer.negate(42)).toBe(-42)
})

it('should return the negation of a number', () => {
  expect(Integer.negate(-42)).toBe(42)
})

it('should return the negation of a number', () => {
  expect(Integer.negate(0)).toBe(0)
})
