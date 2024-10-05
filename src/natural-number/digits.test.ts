import { $, Test, NaturalNumber } from '..'

type Digits_Spec = [
  /**
   * Can convert a natural number to a list of digits.
   */
  Test.Expect<$<NaturalNumber.Digits, 42>, [4, 2]>,

  /**
   * Zero is converted to a list of one digit.
   */
  Test.Expect<$<NaturalNumber.Digits, 0>, [0]>,

  /**
   * Can convert string-encoded natural numbers to a list of digits.
   */
  Test.Expect<$<NaturalNumber.Digits, '42'>, [4, 2]>,

  /**
   * Can convert bigint literals to a list of digits.
   */
  Test.Expect<$<NaturalNumber.Digits, 42n>, [4, 2]>,

  /**
   * Converting the 'number' type results in 'never'.
   */
  Test.Expect<$<NaturalNumber.Digits, number>, never>,

  /**
   * Converting the 'string' type results in 'never'.
   */
  Test.Expect<$<NaturalNumber.Digits, string>, never>
]

it('should convert a natural number to a list of digits', () => {
  expect(NaturalNumber.digits(42)).toEqual([4, 2])
})
