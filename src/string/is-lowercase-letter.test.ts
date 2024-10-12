import { $, String, Test } from '..'

type IsLowercaseLetter_Spec = [
  /**
   * Can check if a string is a lowercase letter.
   */
  Test.Expect<$<String.IsLowercaseLetter, 'a'>, true>,

  /**
   * Can check if a string is not a lowercase letter.
   */
  Test.Expect<$<String.IsLowercaseLetter, '9'>, false>,

  /**
   * An empty string is not a lowercase letter.
   */
  Test.Expect<$<String.IsLowercaseLetter, ''>, false>,

  /**
   * A general string is not a lowercase letter.
   */
  Test.Expect<$<String.IsLowercaseLetter, 'FOO'>, false>,

  /**
   * A template literal string is not a lowercase letter.
   */
  Test.Expect<$<String.IsLowercaseLetter, `a${string}b`>, false>
]

it('should check if a string is a lowercase letter', () => {
  expect(String.isLowercaseLetter('a')).toBe(true)
})

it('returns false for an empty string', () => {
  expect(String.isLowercaseLetter('')).toBe(false)
})

it('returns false for a general string', () => {
  expect(String.isLowercaseLetter('FOO')).toBe(false)
})
