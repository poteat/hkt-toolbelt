import { $, String, Test } from '..'

/**
 * Tests for String.Init, which extracts every element before the last element.
 */
type Init_Spec = [
  /**
   * Can extract the init of a string.
   */
  Test.Expect<$<String.Init, 'foo'>, 'fo'>,

  /**
   * Can extract the init of an empty string.
   */
  Test.Expect<$<String.Init, ''>, ''>,

  /**
   * Can extract the init of a literal string.
   */
  Test.Expect<$<String.Init, `foo${string}`>, `foo`>,

  /**
   * Can extract the init of a template literal string.
   */
  Test.Expect<$<String.Init, `${string}foo`>, `${string}fo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Init, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Init, 'foobar' | 'bazqux'>, 'fooba' | 'bazqu'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Init, `foo${string}bar`>, `foo${string}ba`>,

  /**
   * The init of a string is string.
   */
  Test.Expect<$<String.Init, string>, string>
]

it('should return the string with the last character removed', () => {
  expect(String.init('hello')).toBe('hell')
})

it('should return an empty string if the string is empty', () => {
  expect(String.init('')).toBe('')
})
