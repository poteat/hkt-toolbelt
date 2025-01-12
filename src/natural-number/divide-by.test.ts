import { $, Test, NaturalNumber } from '..'

type DivideBy_Spec = [
  /**
   * 0 / 0 = 0. The quotient is 0.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 0>, 0>, 0>,

  /**
   * 2 / 10 = 5. The quotient is 5.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 2>, 10>, 5>,

  /**
   * 17 / 123 results is 7.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 17>, 123>, 7>,

  /**
   * 1 / 123 = 123. The quotient is 123.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 1>, 123>, 123>,

  /**
   * 123 / 123 = 1. The quotient is 1.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 123>, 123>, 1>,

  /**
   * 25 / 100 = 4.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 25>, 100>, 4>,

  /**
   * 50 / 100 = 2.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 50>, 100>, 2>,

  /**
   * 75 / 100 = 1.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 75>, 100>, 1>,

  /**
   * 99 / 100 = 1.
   */
  Test.Expect<$<$<NaturalNumber.DivideBy, 99>, 100>, 1>
]

it('should return the result of dividing two natural numbers', () => {
  const result = NaturalNumber.divideBy(2)(10)
  expect(result).toBe(5)
})

it('should return the result of dividing two natural numbers', () => {
  const result = NaturalNumber.divideBy(17)(123)
  expect(result).toBe(7)
})
