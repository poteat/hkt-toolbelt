import { $, Test, NaturalNumber } from '..'

type FromHex_Spec = [
  /**
   * Can convert a hexadecimal string to a decimal number.
   */
  Test.Expect<$<NaturalNumber.FromHex, 'fff'>, 4095>,

  /**
   * Can convert a hexadecimal string to a decimal number.
   */
  Test.Expect<$<NaturalNumber.FromHex, '0'>, 0>,

  /**
   * Can convert a hexadecimal string to a decimal number.
   */
  Test.Expect<$<NaturalNumber.FromHex, '1'>, 1>
]

it('should convert a hexadecimal string to a decimal number', () => {
  expect(NaturalNumber.fromHex('fff')).toBe(4095)
})

it('should convert a hexadecimal string to a decimal number', () => {
  expect(NaturalNumber.fromHex('0')).toBe(0)
})

it('should convert a hexadecimal string to a decimal number', () => {
  expect(NaturalNumber.fromHex('1')).toBe(1)
})

it('should convert a hexadecimal string to a decimal number', () => {
  expect(NaturalNumber.fromHex('f')).toBe(15)
})
