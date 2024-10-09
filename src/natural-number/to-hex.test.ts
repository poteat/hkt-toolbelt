import { $, Test, NaturalNumber } from '..'

type ToHex_Spec = [
  /**
   * Can convert a natural number to hex.
   */
  Test.Expect<$<NaturalNumber.ToHex, 999>, '3e7'>,

  /**
   * Can convert a natural number to hex.
   */
  Test.Expect<$<NaturalNumber.ToHex, 1234>, '4d2'>,

  /**
   * Can convert a natural number to hex.
   */
  Test.Expect<$<NaturalNumber.ToHex, 0>, '0'>,

  /**
   * Can convert a natural number to hex with a single digit.
   */
  Test.Expect<$<NaturalNumber.ToHex, 1>, '1'>
]

it('should convert a natural number to hex', () => {
  const result = NaturalNumber.toHex(999)
  expect(result).toBe('3e7')
})

it('should convert a natural number to hex', () => {
  const result = NaturalNumber.toHex(1234)
  expect(result).toBe('4d2')
})

it('should convert a natural number to hex', () => {
  const result = NaturalNumber.toHex(0)
  expect(result).toBe('0')
})
