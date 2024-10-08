import { $, NaturalNumber, Test } from '..'

type IsLessThanOrEqual_Spec = [
  /**
   * 2 is less than or equal to 3.
   */
  Test.Expect<$<$<NaturalNumber.IsLessThanOrEqual, 3>, 2>>,

  /**
   * 3 is less than or equal to 3.
   */
  Test.Expect<$<$<NaturalNumber.IsLessThanOrEqual, 3>, 3>>,

  /**
   * 4 is not less than or equal to 3.
   */
  Test.ExpectNot<$<$<NaturalNumber.IsLessThanOrEqual, 3>, 4>>,

  /**
   * Running 'IsLessThanOrEqual' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<NaturalNumber.IsLessThanOrEqual, boolean>, 2>>
]

it('should return whether the second number is less than or equal to the first', () => {
  expect(NaturalNumber.isLessThanOrEqual(3)(2)).toBe(true)
})

it('should return whether the second number is less than or equal to the first', () => {
  expect(NaturalNumber.isLessThanOrEqual(3)(3)).toBe(true)
})

it('should return whether the second number is less than or equal to the first', () => {
  expect(NaturalNumber.isLessThanOrEqual(3)(4)).toBe(false)
})
