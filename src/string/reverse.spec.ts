import { $, String, Test } from '..'

/**
 * Tests for String.Reverse, which reverses the order of characters in a string.
 */
type Reverse_Spec = [
  /**
   * Can reverse a string.
   */
  Test.Expect<$<String.Reverse, 'foo'>, 'oof'>,

  /**
   * Can reverse an empty string.
   */
  Test.Expect<$<String.Reverse, ''>, ''>,

  /**
   * Can reverse a template literal string.
   */
  Test.Expect<$<String.Reverse, `foo${string}`>, `${string}oof`>,

  /**
   * Can reverse a template literal string.
   */
  Test.Expect<$<String.Reverse, `${string}foo`>, `oof${string}`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Reverse, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Reverse, 'foobar' | 'bazqux'>, 'raboof' | 'xuqzab'>,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Reverse, `foo${string}bar`>, `rab${string}oof`>,

  /**
   * The reverse of a string is string.
   */
  Test.Expect<$<String.Reverse, string>, string>
]
