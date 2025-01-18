import { $, Test, NaturalNumber } from '..'

type CompareBy_Spec = [
  /**
   * Can compare two natural numbers.
   */
  Test.Expect<$<$<NaturalNumber.CompareBy, 2>, 3>, 1>,

  /**
   * Can compare two natural numbers.
   */
  Test.Expect<$<$<NaturalNumber.CompareBy, 3>, 2>, -1>
]

it('should compare two natural numbers', () => {
  expect(NaturalNumber.compareBy(2)(3)).toBe(1)
})

it('should compare two natural numbers', () => {
  expect(NaturalNumber.compareBy(3)(2)).toBe(-1)
})
