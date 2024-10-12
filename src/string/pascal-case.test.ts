import { $, Test, String } from '..'

type PascalCase_Spec = [
  /**
   * Can convert a string to PascalCase.
   */
  Test.Expect<$<String.PascalCase, 'hello world'>, 'HelloWorld'>,

  /**
   * Can convert a string with multiple words.
   */
  Test.Expect<$<String.PascalCase, 'hello world 42'>, 'HelloWorld42'>,

  /**
   * Can convert a string with acronyms.
   */
  Test.Expect<$<String.PascalCase, 'XMLHttpRequest'>, 'XmlHttpRequest'>,

  /**
   * Can convert a string with numbers.
   */
  Test.Expect<$<String.PascalCase, 'hello42world'>, 'Hello42World'>
]

it('should convert a string to PascalCase', () => {
  expect(String.pascalCase('hello world')).toBe('HelloWorld')
})

it('should convert a string with multiple words', () => {
  expect(String.pascalCase('hello world 42')).toBe('HelloWorld42')
})

it('should convert a string with acronyms', () => {
  expect(String.pascalCase('XMLHttpRequest')).toBe('XmlHttpRequest')
})

it('should convert a string with numbers', () => {
  expect(String.pascalCase('hello42world')).toBe('Hello42World')
})

it('should handle an empty string', () => {
  expect(String.pascalCase('')).toBe('')
})
