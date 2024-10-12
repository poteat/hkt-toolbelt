import { $, String, Test } from '..'

type IsDigit_Spec = [
  /**
   * Can check if a string is a digit.
   */
  Test.Expect<$<String.IsDigit, '0'>, true>,

  /**
   * Can check if a string is a digit
   */
  Test.Expect<$<String.IsDigit, '9'>, true>,

  /**
   * Can check if a string is not a digit.
   */
  Test.Expect<$<String.IsDigit, 'a'>, false>,

  /**
   * An empty string is not a digit.
   */
  Test.Expect<$<String.IsDigit, ''>, false>,

  /**
   * A general string is not a digit.
   */
  Test.Expect<$<String.IsDigit, 'foo'>, false>,

  /**
   * A template literal string is not a digit.
   */
  Test.Expect<$<String.IsDigit, `0${string}1`>, false>
]

it('should check if a string is a digit', () => {
  expect(String.isDigit('0')).toBe(true)
})

it('returns false for an empty string', () => {
  expect(String.isDigit('')).toBe(false)
})

it('returns false for a general string', () => {
  expect(String.isDigit('000')).toBe(false)
})
