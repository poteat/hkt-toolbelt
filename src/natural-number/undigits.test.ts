import { $, Test, NaturalNumber } from '..'

type Undigits_Spec = [
  /**
   * Can convert a list of digits to a natural number.
   */
  Test.Expect<$<NaturalNumber.Undigits, [1, 2, 3]>, 123>,

  /**
   * Can convert a list of digits to a natural number.
   */
  Test.Expect<$<NaturalNumber.Undigits, [4, 5, 6]>, 456>
]

it('should convert a list of digits to a natural number', () => {
  expect(NaturalNumber.undigits([1, 2, 3])).toBe(123)
})

it('should convert a list of digits to a natural number', () => {
  expect(NaturalNumber.undigits([4, 5, 6])).toBe(456)
})
