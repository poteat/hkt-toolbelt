import { $, String, Test } from '..'

type Words_Spec = [
  /**
   * Can split a string into words.
   */
  Test.Expect<$<String.Words, 'hello world'>, ['hello', 'world']>,

  /**
   * Can split a string with digits
   */
  Test.Expect<$<String.Words, 'hello42 world'>, ['hello', '42', 'world']>,

  /**
   * Can split a string into words with multiple spaces.
   */
  Test.Expect<$<String.Words, 'foo   bar'>, ['foo', 'bar']>,

  /**
   * Can properly handle acronyms.
   */
  Test.Expect<$<String.Words, 'XMLHttpRequest'>, ['XML', 'Http', 'Request']>,

  /**
   * Can handle alphanumeric input with no delimiters.
   */
  Test.Expect<$<String.Words, 'hello42world'>, ['hello', '42', 'world']>,

  /**
   * Splitting a generic string results in a `string[]` type.
   */
  Test.Expect<$<String.Words, string>, string[]>,

  /**
   * Splitting a template literal string results in a `string[]` type.
   */
  Test.Expect<$<String.Words, `foo${string}bar`>, string[]>
]

it('should split a string into words', () => {
  expect(String.words('hello world')).toEqual(['hello', 'world'])
})

it('should split a string with digits', () => {
  expect(String.words('hello42world')).toEqual(['hello', '42', 'world'])
})

it('should split a string into words with multiple spaces', () => {
  expect(String.words('foo   bar')).toEqual(['foo', 'bar'])
})

it('should properly handle acronyms', () => {
  expect(String.words('XMLHttpRequest')).toEqual(['XML', 'Http', 'Request'])
})
