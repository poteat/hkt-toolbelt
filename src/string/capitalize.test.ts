import { $, Test, String } from '..'

type Capitalize_Spec = [
  /**
   * Can capitalize strings.
   */
  Test.Expect<$<String.Capitalize, 'hello'>, 'Hello'>,

  /**
   * Can capitalize strings with first character already capitalized.
   */
  Test.Expect<$<String.Capitalize, 'Hello'>, 'Hello'>,

  /**
   * Can handle empty string input.
   */
  Test.Expect<$<String.Capitalize, ''>, ''>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<$<Capitalize, ''>, number>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<$<Capitalize, ''>, number>
]

it('should capitalize a string', () => {
  expect(String.capitalize('hello')).toBe('Hello')
})

it('should capitalize a string with first character already capitalized', () => {
  expect(String.capitalize('Hello')).toBe('Hello')
})

it('should handle empty string input', () => {
  expect(String.capitalize('')).toBe('')
})
