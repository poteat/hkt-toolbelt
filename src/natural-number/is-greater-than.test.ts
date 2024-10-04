import { $, NaturalNumber, Test } from '..'

type IsGreaterThan_Spec = [
  /**
   * 4 is greater than 3.
   */
  Test.Expect<$<$<NaturalNumber.IsGreaterThan, 3>, 4>>,

  /**
   * 2 is not greater than 3.
   */
  Test.ExpectNot<$<$<NaturalNumber.IsGreaterThan, 3>, 2>>,

  /**
   * 3 is not greater than 3.
   */
  Test.ExpectNot<$<$<NaturalNumber.IsGreaterThan, 3>, 3>>,

  /**
   * Running 'IsGreaterThan' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<NaturalNumber.IsGreaterThan, boolean>, 2>>
]

it('should return whether the second number is greater than the first', () => {
  expect(NaturalNumber.isGreaterThan(3)(2)).toBe(false)
})
