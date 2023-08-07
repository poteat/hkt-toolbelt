import { $, String, Test } from '..'

/**
 * Tests for `String.IsString`, which checks if a type is a string.
 */
type IsString_Spec = [
  /**
   * A string is a string.
   */
  Test.Expect<$<String.IsString, 'foo'>, true>,

  /**
   * An empty string is a string.
   */
  Test.Expect<$<String.IsString, ''>, true>,

  /**
   * A template literal string is a string.
   */
  Test.Expect<$<String.IsString, `foo${string}`>, true>,

  /**
   * A template literal string is a string.
   */
  Test.Expect<$<String.IsString, `${string}foo`>, true>,

  /**
   * A number is not a string.
   */
  Test.Expect<$<String.IsString, number>, false>,

  /**
   * A boolean is not a string.
   */
  Test.Expect<$<String.IsString, boolean>, false>,

  /**
   * A union type is both a string and not a string, depending on the types in
   * the union.
   */
  Test.Expect<$<String.IsString, 'foo' | number>, boolean>,

  /**
   * A union type containing a string is kind of a string.
   */
  Test.Expect<$<String.IsString, number | 'foo'>, boolean>,

  /**
   * A union type that does not contain a string is not a string.
   */
  Test.Expect<$<String.IsString, number | boolean>, false>,

  /**
   * A union type that does not contain a string is not a string.
   */
  Test.Expect<$<String.IsString, boolean | number>, false>
]
