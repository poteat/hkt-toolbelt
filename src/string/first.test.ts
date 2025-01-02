import { $, String, Test } from '..'

/**
 * Tests for String.First, which extracts the first character type from a
 * string.
 */
type First_Spec = [
  /**
   * Can extract the first character from a string.
   */
  Test.Expect<$<String.First, 'foo'>, 'f'>,

  /**
   * Can extract the first character from an empty string.
   */
  Test.Expect<$<String.First, ''>, ''>,

  /**
   * Can extract the first character from a literal string.
   */
  Test.Expect<$<String.First, `foo${string}`>, 'f'>,

  /**
   * Can extract the first character from a template literal string.
   */
  Test.Expect<$<String.First, `${string}foo`>, string>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.First, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.First, 'foobar' | 'bazqux'>, 'f' | 'b'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.First, `foo${string}bar`>, 'f'>,

  /**
   * The first character of a string is string.
   */
  Test.Expect<$<String.First, string>, string>
]

it('should return the first character of a string', () => {
  expect(String.first('foo')).toBe('f')
})

it('should return the first character of an empty string', () => {
  expect(String.first('')).toBe('')
})
