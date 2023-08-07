import { $, String, Test } from '..'

/**
 * Tests for String.Tail, which extracts every element after the first element
 * of a string.
 */
type Tail_Spec = [
  /**
   * Can extract the tail of a string.
   */
  Test.Expect<$<String.Tail, 'foo'>, 'oo'>,

  /**
   * Can extract the tail of an empty string.
   */
  Test.Expect<$<String.Tail, ''>, ''>,

  /**
   * Can extract the tail of a literal string.
   */
  Test.Expect<$<String.Tail, `foo${string}`>, `oo${string}`>,

  /**
   * Can extract the tail of a template literal string.
   */
  Test.Expect<$<String.Tail, `${string}foo`>, `foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Tail, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Tail, 'foobar' | 'bazqux'>, 'oobar' | 'azqux'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Tail, `foo${string}bar`>, `oo${string}bar`>,

  /**
   * The tail of a string is string.
   */
  Test.Expect<$<String.Tail, string>, string>
]
