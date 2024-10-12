import { $, Test, String } from '..'

type KebabCase_Spec = [
  /**
   * Can convert a string to kebab-case.
   */
  Test.Expect<$<String.KebabCase, 'hello world'>, 'hello-world'>,

  /**
   * Can convert a string with multiple words.
   */
  Test.Expect<$<String.KebabCase, 'hello world 42'>, 'hello-world-42'>,

  /**
   * Can convert a string with acronyms.
   */
  Test.Expect<$<String.KebabCase, 'XMLHttpRequest'>, 'xml-http-request'>,

  /**
   * Can convert a string with numbers.
   */
  Test.Expect<$<String.KebabCase, 'hello42world'>, 'hello-42-world'>
]

it('should convert a string to kebab-case', () => {
  expect(String.kebabCase('hello world')).toBe('hello-world')
})

it('should convert a string with multiple words', () => {
  expect(String.kebabCase('hello world 42')).toBe('hello-world-42')
})

it('should convert a string with acronyms', () => {
  expect(String.kebabCase('XMLHttpRequest')).toBe('xml-http-request')
})

it('should convert a string with numbers', () => {
  expect(String.kebabCase('hello42world')).toBe('hello-42-world')
})

it('should handle an empty string', () => {
  expect(String.kebabCase('')).toBe('')
})
