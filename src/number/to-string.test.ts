import { $, Test, Number } from '..'

type ToString_Spec = [
  /**
   * Can parse zero.
   */
  Test.Expect<$<Number.ToString, 0>, '0'>,

  /**
   * Can parse a valid number.
   */
  Test.Expect<$<Number.ToString, 42>, '42'>,

  /**
   * Can parse a valid negative number.
   */
  Test.Expect<$<Number.ToString, -42>, '-42'>,

  /**
   * Can parse a valid floating point number.
   */
  Test.Expect<$<Number.ToString, 42.42>, '42.42'>,

  /**
   * Can parse a valid negative floating point number.
   */
  Test.Expect<$<Number.ToString, -42.42>, '-42.42'>,

  /**
   * Can parse a large number.
   */
  Test.Expect<$<Number.ToString, 9007199254740991>, '9007199254740991'>,

  /**
   * Infinity gets mapped to 'number'.
   */
  Test.Expect<$<Number.ToString, typeof Infinity>, `${number}`>
]

it('should convert a number to a string', () => {
  expect(Number.toString(42)).toBe('42')
})
