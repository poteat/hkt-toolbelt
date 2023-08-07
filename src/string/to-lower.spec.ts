import { $, String, Test } from '..';

/**
 * Tests for `String.ToLower`, which converts a string to lowercase for all
 * characters.
 */
type ToLower_Spec = [
  /**
   * Can lowercase a string.
   */
  Test.Expect<$<String.ToLower, 'FOO'>, 'foo'>,

  /**
   * Can lowercase an empty string.
   */
  Test.Expect<$<String.ToLower, ''>, ''>,

  /**
   * Can lowercase a template literal string.
   */
  Test.Expect<$<String.ToLower, `FOO${string}`>, `foo${Lowercase<string>}`>,

  /**
   * Can lowercase a template literal string.
   */
  Test.Expect<$<String.ToLower, `${string}FOO`>, `${Lowercase<string>}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.ToLower, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.ToLower, 'FOOBAR' | 'BAZQUX'>, 'foobar' | 'bazqux'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<
    $<String.ToLower, `FOO${string}BAR`>,
    `foo${Lowercase<string>}bar`
  >,

  /**
   * The lower of a string is string.
   */
  Test.Expect<$<String.ToLower, string>, Lowercase<string>>
];
