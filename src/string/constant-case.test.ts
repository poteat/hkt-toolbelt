import { $, Test, String } from '..'

type ConstantCase_Spec = [
  /**
   * Can convert a string to CONSTANT_CASE.
   */
  Test.Expect<$<String.ConstantCase, 'hello world'>, 'HELLO_WORLD'>,

  /**
   * Can convert a string with multiple words.
   */
  Test.Expect<$<String.ConstantCase, 'hello world 42'>, 'HELLO_WORLD_42'>,

  /**
   * Can convert a string with acronyms.
   */
  Test.Expect<$<String.ConstantCase, 'XMLHttpRequest'>, 'XML_HTTP_REQUEST'>,

  /**
   * Can convert a string with numbers.
   */
  Test.Expect<$<String.ConstantCase, 'hello42world'>, 'HELLO_42_WORLD'>
]

it('should convert a string to CONSTANT_CASE', () => {
  expect(String.constantCase('hello world')).toBe('HELLO_WORLD')
})

it('should convert a string with multiple words', () => {
  expect(String.constantCase('hello world 42')).toBe('HELLO_WORLD_42')
})

it('should convert a string with acronyms', () => {
  expect(String.constantCase('XMLHttpRequest')).toBe('XML_HTTP_REQUEST')
})

it('should convert a string with numbers', () => {
  expect(String.constantCase('hello42world')).toBe('HELLO_42_WORLD')
})

it('should handle an empty string', () => {
  expect(String.constantCase('')).toBe('')
})
