import { $, Test, Number } from '..'

type IsNaturalNumber_Spec = [
  /**
   * Can check if a number is a natural number.
   */
  Test.Expect<$<Number.IsNatural, 42>>,

  /**
   * Can check if a number is not a natural number.
   */
  Test.Expect<$<Number.IsNatural, 42.42>, false>,

  /**
   * Can recognize negative numbers.
   */
  Test.Expect<$<Number.IsNatural, -42>, false>,

  /**
   * Can recognize negative fractional numbers.
   */
  Test.Expect<$<Number.IsNatural, -42.42>, false>,

  /**
   * Zero is a natural number.
   */
  Test.Expect<$<Number.IsNatural, 0>>,

  /**
   * Evaluates the 'number' type properly.
   */
  Test.Expect<$<Number.IsNatural, number>, false>,

  /**
   * Invalid strings are not natural numbers.
   */
  Test.Expect<$<Number.IsNatural, 'foo'>, false>,

  /**
   * Empty strings are not natural numbers.
   */
  Test.Expect<$<Number.IsNatural, ''>, false>,

  /**
   * The 'string' type is not a natural number.
   */
  Test.Expect<$<Number.IsNatural, string>, false>
]

it('should check if a number is a natural number', () => {
  expect(Number.isNatural(42)).toBe(true)
})

it('values which are not natural numbers should not be natural numbers', () => {
  expect(Number.isNatural(42.42)).toBe(false)
})

it('can recognize negative numbers', () => {
  expect(Number.isNatural(-42)).toBe(false)
})

it('zero is a natural number', () => {
  expect(Number.isNatural(0)).toBe(true)
})

it('can evaluate string numbers', () => {
  expect(Number.isNatural('42')).toBe(true)
})
