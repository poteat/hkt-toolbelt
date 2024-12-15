import { $, Test, Number } from '..'

/**
 * `Compare_Spec` is a type-level array that contains test cases for the `Number.Compare` utility.
 *
 * Each test case is an expectation that compares two numbers and checks if the result is as expected.
 *
 * @example
 * Test.Expect<$<$<Number.Compare, 123>, 123>, 0>,
 * Test.Expect<$<$<Number.Compare, 123>, 321>, -1>,
 * Test.Expect<$<$<Number.Compare, 321>, 123>, 1>,
 * ...
 */
type Compare_Spec = [
  /**
   * Can compare two numbers.
   */
  Test.Expect<$<$<Number.Compare, 123>, 123>, 0>,

  Test.Expect<$<$<Number.Compare, 123>, 321>, -1>,

  Test.Expect<$<$<Number.Compare, 321>, 123>, 1>,

  /**
   * Can compare two numbers with negative signs.
   */
  Test.Expect<$<$<Number.Compare, 123>, -123>, 1>,

  Test.Expect<$<$<Number.Compare, -321>, 123>, -1>,

  Test.Expect<$<$<Number.Compare, -123>, -321>, 1>,

  Test.Expect<$<$<Number.Compare, -321>, -123>, -1>,

  Test.Expect<$<$<Number.Compare, -123>, 0>, -1>,

  Test.Expect<$<$<Number.Compare, 0>, -123>, 1>,

  /**
   * Can compare two 3-digit numbers that result in a two-digit number.
   */
  Test.Expect<$<$<Number.Compare, 168>, 123>, 1>,

  /**
   * One minus one is zero.
   */
  Test.Expect<$<$<Number.Compare, 1>, 1>, 0>,

  /**
   * Zero minus anything is zero.
   */
  Test.Expect<$<$<Number.Compare, 0>, 123>, -1>,

  /**
   * Can compare a larger number to a smaller one.
   */
  Test.Expect<$<$<Number.Compare, 1000>, 1>, 1>,

  /**
   * Can compare a smaller number to a larger one.
   */
  Test.Expect<$<$<Number.Compare, 1>, 1000>, -1>,

  /**
   * Can compare a number from itself.
   */
  Test.Expect<$<$<Number.Compare, 12>, 12>, 0>,

  /**
   * Can compare zero.
   */
  Test.Expect<$<$<Number.Compare, 12>, 0>, 1>,

  /**
   * Can compare zero from zero.
   */
  Test.Expect<$<$<Number.Compare, 0>, 0>, 0>,

  /**
   * Can compare large numbers.
   */
  Test.Expect<$<$<Number.Compare, 123456789>, 1>, 1>,

  /**
   * All numbers are greater than 'never'.
   */
  Test.Expect<$<$<Number.Compare, 42>, never>, 1>,

  /**
   * Can compare fractionals.
   */
  Test.Expect<$<$<Number.Compare, 125>, 121>, 1>,

  Test.Expect<$<$<Number.Compare, 125.4>, 126.2>, -1>,

  Test.Expect<$<$<Number.Compare, 42.0>, 42.0>, 0>,

  Test.Expect<$<$<Number.Compare, 42.0>, 42.0>, 0>,

  Test.Expect<$<$<Number.Compare, 42.04>, 42.02>, 1>,

  Test.Expect<$<$<Number.Compare, 42.02>, 42.04>, -1>,

  Test.Expect<$<$<Number.Compare, -42.04>, -42.02>, -1>,

  Test.Expect<$<$<Number.Compare, -42.02>, -42.04>, 1>,

  Test.Expect<$<$<Number.Compare, 42.002>, 42.004>, -1>,

  Test.Expect<$<$<Number.Compare, 0.123>, 0.1>, 1>,

  Test.Expect<$<$<Number.Compare, 0.0123>, 0.01234>, -1>,

  Test.Expect<$<$<Number.Compare, 0.01234>, 0.001234>, 1>,

  Test.Expect<$<$<Number.Compare, 0.0001234>, 0.01234>, -1>
]

describe('Number.compare', () => {
  it('should return 1 for greater numbers', () => {
    expect(Number.compare(2)(3)).toBe(-1)
  })

  it('should return -1 for less numbers', () => {
    expect(Number.compare(3)(2)).toBe(1)
  })

  it('should return 0 for equal numbers', () => {
    expect(Number.compare(2)(2)).toBe(0)
  })

  it('should return 1 for greater numbers with negative signs', () => {
    expect(Number.compare(-2)(3)).toBe(-1)
  })

  it('should return -1 for less numbers with negative signs', () => {
    expect(Number.compare(3)(-2)).toBe(1)
  })

  it('should return 0 for equal numbers with negative signs', () => {
    expect(Number.compare(-2)(-2)).toBe(0)
  })

  it('should return 1 for greater numbers with fractionals', () => {
    expect(Number.compare(2.5)(3)).toBe(-1)
  })

  it('should return -1 for less numbers with fractionals', () => {
    expect(Number.compare(3)(2.5)).toBe(1)
  })

  it('should return 0 for equal numbers with fractionals', () => {
    expect(Number.compare(2.5)(2.5)).toBe(0)
  })
})
