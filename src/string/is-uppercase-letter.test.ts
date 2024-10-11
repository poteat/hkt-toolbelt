import { $, String, Test } from '..'

type IsUppercaseLetter_Spec = [
  /**
   * Can check if a string is an uppercase letter.
   */
  Test.Expect<$<String.IsUppercaseLetter, 'A'>, true>,

  /**
   * Can check if a string is not an uppercase letter.
   */
  Test.Expect<$<String.IsUppercaseLetter, '9'>, false>,

  /**
   * An empty string is not an uppercase letter.
   */
  Test.Expect<$<String.IsUppercaseLetter, ''>, false>,

  /**
   * A general string is not an uppercase letter.
   */
  Test.Expect<$<String.IsUppercaseLetter, 'foo'>, false>,

  /**
   * A template literal string is not an uppercase letter.
   */
  Test.Expect<$<String.IsUppercaseLetter, `A${string}B`>, false>
]

it('should check if a string is an uppercase letter', () => {
  expect(String.isUppercaseLetter('A')).toBe(true)
})

it('returns false for an empty string', () => {
  expect(String.isUppercaseLetter('')).toBe(false)
})

it('returns false for a general string', () => {
  expect(String.isUppercaseLetter('foo')).toBe(false)
})
