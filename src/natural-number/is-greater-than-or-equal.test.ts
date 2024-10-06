import { $, NaturalNumber, Test } from '..'

type IsGreaterThanOrEqual_Spec = [
  /**
   * 4 is greater than or equal to 3.
   */
  Test.Expect<$<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 4>>,

  /**
   * 2 is not greater than or equal to 3.
   */
  Test.ExpectNot<$<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 2>>,

  /**
   * 3 is greater than or equal to 3.
   */
  Test.Expect<$<$<NaturalNumber.IsGreaterThanOrEqual, 3>, 3>>,

  /**
   * Running 'IsGreaterThanOrEqual' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<NaturalNumber.IsGreaterThanOrEqual, boolean>, 2>>
]

it('should return whether the second number is greater than or equal to the first', () => {
  expect(NaturalNumber.isGreaterThanOrEqual(3)(2)).toBe(false)
})

it('should return whether the second number is greater than or equal to the first', () => {
  expect(NaturalNumber.isGreaterThanOrEqual(3)(3)).toBe(true)
})

it('should return whether the second number is greater than or equal to the first', () => {
  expect(NaturalNumber.isGreaterThanOrEqual(3)(2)).toBe(false)
})
