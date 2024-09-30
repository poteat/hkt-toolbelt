import { $, Number, Test } from '..'

type IsLessThan_Spec = [
  /**
   * -3.1 is less than -3.
   */
  Test.Expect<$<$<Number.IsLessThan, -3>, -3.1>>,

  /**
   * -3 is not less than -3.
   */
  Test.ExpectNot<$<$<Number.IsLessThan, -3>, -3>>,

  /**
   * 3.1 is not less than -3.
   */
  Test.ExpectNot<$<$<Number.IsLessThan, -3>, 3.1>>,

  /**
   * Running 'IsLessThan' on a non-number type should emit an error.
   */
  // @ts-expect-error
  Test.Expect<$<$<Number.IsLessThan, boolean>, 2>>
]

it('should return whether the second number is less than the first', () => {
  expect(Number.isLessThan(3)(-2)).toBe(true)
})
