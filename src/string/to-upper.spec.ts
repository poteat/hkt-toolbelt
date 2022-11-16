import { $, String, Test } from "hkt-toolbelt";

/**
 * Tests for `String.ToUpper`, which converts a string to uppercase for all
 * characters.
 */
type ToUpper_Spec = [
  /**
   * Can uppercase a string.
   */
  Test.Expect<$<String.ToUpper, "foo">, "FOO">,

  /**
   * Can uppercase an empty string.
   */
  Test.Expect<$<String.ToUpper, "">, "">,

  /**
   * Can uppercase a template literal string.
   */
  Test.Expect<$<String.ToUpper, `foo${string}`>, `FOO${Uppercase<string>}`>,

  /**
   * Can uppercase a template literal string.
   */
  Test.Expect<$<String.ToUpper, `${string}foo`>, `${Uppercase<string>}FOO`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.ToUpper, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.ToUpper, "foobar" | "bazqux">, "FOOBAR" | "BAZQUX">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<
    $<String.ToUpper, `foo${string}bar`>,
    `FOO${Uppercase<string>}BAR`
  >,

  /**
   * The upper of a string is string.
   */
  Test.Expect<$<String.ToUpper, string>, Uppercase<string>>
];
