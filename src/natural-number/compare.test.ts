import { $, NaturalNumber, Test } from '..'

type Compare_Spec = [
  /**
   * Can compare two numbers.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 123>, 123>, 0>,

  Test.Expect<$<$<NaturalNumber.Compare, 123>, 321>, -1>,

  Test.Expect<$<$<NaturalNumber.Compare, 321>, 123>, 1>,

  /**
   * Can compare two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 168>, 123>, 1>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 1>, 1>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 0>, 123>, -1>,

  /**
   * Can compare a larger number to a smaller one.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 1000>, 1>, 1>,

  /**
   * Can compare a smaller number to a larger one.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 1>, 1000>, -1>,

  /**
   * Can compare a number from itself.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 12>, 12>, 0>,

  /**
   * Can compare zero.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 12>, 0>, 1>,

  /**
   * Can compare zero from zero.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 0>, 0>, 0>,

  /**
   * Can compare large numbers.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 123456789>, 1>, 1>,

  /**
   * Can compare numbers that are close together.
   */
  Test.Expect<$<$<NaturalNumber.Compare, 125>, 121>, 1>
]

describe('NaturalNumber.compare', () => {
  it('should return 0 for equal numbers', () => {
    expect(NaturalNumber.compare(2)(2)).toBe(0)
  })

  it('should return -1 for less numbers', () => {
    expect(NaturalNumber.compare(2)(3)).toBe(-1)
  })

  it('should return 1 for greater numbers', () => {
    expect(NaturalNumber.compare(3)(2)).toBe(1)
  })
})
