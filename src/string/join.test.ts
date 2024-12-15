import { $, String, Test } from '..'

type Join_Spec = [
  /**
   * Can join strings.
   */
  Test.Expect<$<$<String.Join, ''>, ['foo', 'bar']>, 'foobar'>,

  /**
   * Can join a single tuple.
   */
  Test.Expect<$<$<String.Join, '.'>, ['foo']>, 'foo'>,

  /**
   * Can join strings with a separator.
   */
  Test.Expect<$<$<String.Join, ' '>, ['foo', 'bar', 'qux']>, 'foo bar qux'>,

  /**
   * Joining an empty array results in the empty string.
   */
  Test.Expect<$<$<String.Join, ''>, []>, ''>,

  /**
   * Joining an array of strings results in a string.
   */
  Test.Expect<$<$<String.Join, ''>, string[]>, string>,

  /**
   * Can join literal strings and 'string'.
   */
  Test.Expect<$<$<String.Join, ''>, ['foo', string]>, `foo${string}`>,

  /**
   * Can join 'string' and literal strings.
   */
  Test.Expect<$<$<String.Join, ''>, [string, 'foo']>, `${string}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<$<String.Join, ''>, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<
    $<$<String.Join, ''>, ['foo', 'bar'] | ['baz', 'qux']>,
    'foobar' | 'bazqux'
  >,

  /**
   * Properly handles string union as the separator.
   */
  Test.Expect<
    $<$<String.Join, ' ' | '-'>, ['foo', 'bar']>,
    'foo bar' | 'foo-bar'
  >,

  /**
   * Enforces string separator type.
   */
  // @ts-expect-error
  $<$<String.Join, 1>, ['foo', 'bar']>,

  /**
   * Properly handles 'string' delimiter.
   */
  Test.Expect<$<$<String.Join, string>, ['foo', 'bar']>, `foo${string}bar`>,

  /**
   * All variadic tuples are joined as a string.
   */
  Test.Expect<$<$<String.Join, ''>, ['foo', ...string[]]>, string>,

  /**
   * Properly handles variadic tuples with a separator.
   */
  Test.Expect<$<$<String.Join, ' '>, ['foo', ...string[]]>, string>,

  /**
   * Properly handles variadic tuples with template literal separators.
   */
  Test.Expect<
    $<$<String.Join, ` ${string} `>, ['foo', ...string[], 'bar']>,
    string
  >,

  /**
   * Should handle empty values well.
   */
  Test.Expect<$<$<String.Join, '-'>, ['', '', 'foobar']>, '--foobar'>
]

it('should join a list of strings with a delimiter', () => {
  expect(String.join(' ')(['foo', 'bar', 'baz'])).toBe('foo bar baz')
})

it('should handle empty values well', () => {
  expect(String.join('-')(['', '', 'foobar'])).toBe('--foobar')
})
