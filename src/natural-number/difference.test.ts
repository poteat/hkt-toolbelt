import { $, Test, NaturalNumber } from '..'

type Difference_Spec = [
  /**
   * Can compute the absolute difference between two natural numbers.
   */
  Test.Expect<$<$<NaturalNumber.Difference, 42>, 10>, 32>,

  /**
   * Can compute the absolute difference between two natural numbers.
   */
  Test.Expect<$<$<NaturalNumber.Difference, 10>, 42>, 32>,

  /**
   * Can compute the absolute difference between two natural numbers.
   */
  Test.Expect<$<$<NaturalNumber.Difference, 0>, 42>, 42>
]

it('should compute the absolute difference between two natural numbers', () => {
  expect(NaturalNumber.difference(42)(10)).toBe(32)
})

it('should compute the absolute difference between two natural numbers', () => {
  expect(NaturalNumber.difference(10)(42)).toBe(32)
})

it('should compute the absolute difference between two natural numbers', () => {
  expect(NaturalNumber.difference(0)(42)).toBe(42)
})
