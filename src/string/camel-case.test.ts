import { $, Test, String } from '..'

type CamelCase_Spec = [
  /**
   * Can convert a string to camelCase.
   */
  Test.Expect<$<String.CamelCase, 'hello world'>, 'helloWorld'>,

  /**
   * Can convert a string with multiple words.
   */
  Test.Expect<$<String.CamelCase, 'hello world 42'>, 'helloWorld42'>,

  /**
   * Can convert a string with acronyms.
   */
  Test.Expect<$<String.CamelCase, 'XMLHttpRequest'>, 'xmlHttpRequest'>,

  /**
   * Can convert a string with numbers.
   */
  Test.Expect<$<String.CamelCase, 'hello42world'>, 'hello42World'>,

  /**
   * Can convert a string with a mix of words and numbers.
   */
  Test.Expect<$<String.CamelCase, 'hello42world 42'>, 'hello42World42'>,

  /**
   * Can handle an empty string.
   */
  Test.Expect<$<String.CamelCase, ''>, ''>
]

it('should convert a string to camelCase', () => {
  expect(String.camelCase('hello world')).toBe('helloWorld')
})

it('should convert a string with multiple words', () => {
  expect(String.camelCase('hello world 42')).toBe('helloWorld42')
})

it('should convert a string with acronyms', () => {
  expect(String.camelCase('XMLHttpRequest')).toBe('xmlHttpRequest')
})

it('should convert a string with numbers', () => {
  expect(String.camelCase('hello42world')).toBe('hello42World')
})

it('should convert a string with a mix of words and numbers', () => {
  expect(String.camelCase('hello42world 42')).toBe('hello42World42')
})

it('should handle an empty string', () => {
  expect(String.camelCase('')).toBe('')
})
