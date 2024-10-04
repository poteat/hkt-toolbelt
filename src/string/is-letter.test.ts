import { $, String, Test } from '..'

type IsLetter_Spec = [
  /**
   * Can check if a string is a letter.
   */
  Test.Expect<$<String.IsLetter, 'f'>, true>,

  /**
   * Can check if a string is not a letter.
   */
  Test.Expect<$<String.IsLetter, '9'>, false>,

  /**
   * An empty string is not a letter.
   */
  Test.Expect<$<String.IsLetter, ''>, false>,

  /**
   * A template literal string is not a letter.
   */
  Test.Expect<$<String.IsLetter, `f${string}o`>, false>
]

it('should check if a string is a letter', () => {
  expect(String.isLetter('f')).toBe(true)
})

it('returns false for an empty string', () => {
  expect(String.isLetter('')).toBe(false)
})
