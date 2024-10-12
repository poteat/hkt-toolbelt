import { $, Test, String } from '..'

type SnakeCase_Spec = [
  /**
   * Can convert a string to snake_case.
   */
  Test.Expect<$<String.SnakeCase, 'hello world'>, 'hello_world'>,

  /**
   * Can convert a string with multiple words.
   */
  Test.Expect<$<String.SnakeCase, 'hello world 42'>, 'hello_world_42'>,

  /**
   * Can convert a string with acronyms.
   */
  Test.Expect<$<String.SnakeCase, 'XMLHttpRequest'>, 'xml_http_request'>,

  /**
   * Can convert a string with numbers.
   */
  Test.Expect<$<String.SnakeCase, 'hello42world'>, 'hello_42_world'>
]

it('should convert a string to snake_case', () => {
  expect(String.snakeCase('hello world')).toBe('hello_world')
})

it('should convert a string with multiple words', () => {
  expect(String.snakeCase('hello world 42')).toBe('hello_world_42')
})

it('should convert a string with acronyms', () => {
  expect(String.snakeCase('XMLHttpRequest')).toBe('xml_http_request')
})

it('should convert a string with numbers', () => {
  expect(String.snakeCase('hello42world')).toBe('hello_42_world')
})

it('should handle an empty string', () => {
  expect(String.snakeCase('')).toBe('')
})
