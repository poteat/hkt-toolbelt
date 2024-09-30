import { $, String, Test } from '..'

/**
 * Tests for $<$<String.Replace, From, To> which replaces all instances of From
 * with To in a string.
 */
type Replace_Spec = [
  /**
   * Can replace a string with another string.
   */
  Test.Expect<$<$<$<String.Replace, 'foo'>, 'bar'>, 'foobar'>, 'barbar'>,

  /**
   * Can replace a string with an empty string.
   */
  Test.Expect<$<$<$<String.Replace, 'foo'>, ''>, 'foo'>, ''>,

  /**
   * Can replace an empty string with a string.
   */
  Test.Expect<$<$<$<String.Replace, ''>, ' '>, 'foo'>, ' f o o '>,

  /**
   * Can replace an empty string with an empty string.
   */
  Test.Expect<$<$<$<String.Replace, ''>, ''>, 'foo'>, 'foo'>,

  /**
   * Can replace a string with a template literal string.
   */
  Test.Expect<
    $<$<$<String.Replace, 'foo'>, `${string}bar`>, 'foo'>,
    `${string}bar`
  >,

  /**
   * Handles 'string' in the From parameter by returning a string type.
   */
  Test.Expect<$<$<$<String.Replace, string>, 'bar'>, 'foo'>, string>,

  /**
   * All template literal types in the 'From' field result in a string type.
   */
  Test.Expect<$<$<$<String.Replace, `${string}foo`>, 'bar'>, 'foo'>, string>,

  /**
   * Handles union types in the 'From' field.
   */
  Test.Expect<
    $<$<$<String.Replace, 'foo' | 'bar'>, 'baz'>, 'foobar'>,
    'bazbar' | 'foobaz'
  >,

  /**
   * Handles union types in the 'To' field.
   */
  Test.Expect<
    $<$<$<String.Replace, 'foo'>, 'bar' | 'baz'>, 'foobar'>,
    'barbar' | 'bazbar'
  >,

  /**
   * Emits an error when applied to a non-string type.
   */
  // @ts-expect-error
  $<$<$<String.Replace, 'foo'>, 'bar'>, number>
]

it('should replace all instances of a string with another string', () => {
  expect(String.replace('foo')('bar')('foobar')).toBe('barbar')
})
