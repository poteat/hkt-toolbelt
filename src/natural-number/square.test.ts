import { $, Test, NaturalNumber } from '..'

type Square_Spec = [
  /**
   * Can square a natural number.
   */
  Test.Expect<$<NaturalNumber.Square, 42>, 1764>,

  /**
   * Squaring zero results in zero.
   */
  Test.Expect<$<NaturalNumber.Square, 0>, 0>
]

it('should square a natural number', () => {
  expect(NaturalNumber.square(42)).toBe(1764)
})
