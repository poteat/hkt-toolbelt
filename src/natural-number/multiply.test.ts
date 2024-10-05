import { $, Test, NaturalNumber, Type } from '..'

type Multiply_Spec = [
  /**
   * 2 * 2 = 4
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 2>, 2>, 4>,

  /**
   * 3 * 3 = 9
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 3>, 3>, 9>,

  /**
   * 4 * 4 = 16
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 4>, 4>, 16>,

  /**
   * 99 * 99 = 9801
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 99>, 99>, 9801>,

  /**
   * 100 * 100 = 10000
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 100>, 100>, 10000>,

  /**
   * 999 * 0 = 0
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 999>, 0>, 0>,

  /**
   * 101 * 101 = 10201
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 101>, 101>, 10201>,

  /**
   * 0 * 0 = 0
   */
  Test.Expect<$<$<NaturalNumber.Multiply, 0>, 0>, 0>,

  /**
   * Can multiply numbers as strings.
   */
  Test.Expect<$<$<NaturalNumber.Multiply, '1234'>, '5678'>, 7006652>,

  /**
   * Non-natural number input emits never
   */
  Test.Expect<$<$<NaturalNumber.Multiply, -42.42>, 42>, never>
]

it('should multiply two natural numbers', () => {
  expect(NaturalNumber.multiply(2)(2)).toBe(4)
})

it('can multiply by zero', () => {
  expect(NaturalNumber.multiply(0)(0)).toBe(0)
})

it('can multiply by a string', () => {
  const result = NaturalNumber.multiply('1234')('5678')
  expect(result).toBe(7006652)
})

it('multiplying non-natural numbers results in never', () => {
  expect(NaturalNumber.multiply(-42.42)(42)).toBe(Type.never)
})
