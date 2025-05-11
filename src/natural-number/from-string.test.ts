import { $, Test, NaturalNumber } from '..'

type FromString_Spec = [
  /**
   * Can convert a string to a natural number.
   */
  Test.Expect<$<NaturalNumber.FromString, '123'>, 123>,

  /**
   * Returns 0 for string '0'.
   */
  Test.Expect<$<NaturalNumber.FromString, '0'>, 0>,

  /**
   * Rejects negative numbers.
   */
  Test.Expect<$<NaturalNumber.FromString, '-123'>, never>,

  /**
   * Rejects non-numeric strings.
   */
  Test.Expect<$<NaturalNumber.FromString, 'abc'>, never>,

  /**
   * Rejects decimal numbers.
   */
  Test.Expect<$<NaturalNumber.FromString, '123.45'>, never>,

  /**
   * Works with actual number types.
   */
  Test.Expect<$<NaturalNumber.FromString, 123>, 123>
]

describe('NaturalNumber.fromString', () => {
  it('should convert a string to a natural number', () => {
    expect(NaturalNumber.fromString('123')).toBe(123)
    expect(NaturalNumber.fromString('0')).toBe(0)
  })

  it('should return NaN for negative numbers', () => {
    expect(NaturalNumber.fromString('-123')).toBeNaN()
  })

  it('should return NaN for non-numeric strings', () => {
    expect(NaturalNumber.fromString('abc')).toBeNaN()
  })

  it('should return NaN for decimal numbers', () => {
    expect(NaturalNumber.fromString('123.45')).toBeNaN()
  })
})
