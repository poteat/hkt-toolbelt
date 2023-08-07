import { $, String, Test } from '..';

/**
 * Tests for String.Last, which extracts the last character type from a
 * string.
 */
type Last_Spec = [
  /**
   * Can extract the last character from a string.
   */
  Test.Expect<$<String.Last, 'foo'>, 'o'>,

  /**
   * Can extract the last character from an empty string.
   */
  Test.Expect<$<String.Last, ''>, ''>,

  /**
   * Can extract the last character from a literal string.
   */
  Test.Expect<$<String.Last, `foo${string}`>, string>,

  /**
   * Can extract the last character from a template literal string.
   */
  Test.Expect<$<String.Last, `${string}foo`>, 'o'>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Last, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Last, 'foobar' | 'bazqux'>, 'r' | 'x'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Last, `foo${string}bar`>, 'r'>,

  /**
   * The last character of a string is string.
   */
  Test.Expect<$<String.Last, string>, string>
];
