import { $, String, Test } from '..'

type Append_Spec = [
  /**
   * Can append strings.
   */
  Test.Expect<$<$<String.Append, 'bar'>, 'foo'>, 'foobar'>,

  /**
   * Can append the empty string.
   */
  Test.Expect<$<$<String.Append, ''>, 'foo'>, 'foo'>,

  /**
   * Appending a string to a literal string results in a narrow variadic string.
   */
  Test.Expect<$<$<String.Append, string>, 'foo'>, `foo${string}`>,

  /**
   * Appending a literal to a string results in a narrow variadic string.
   */
  Test.Expect<$<$<String.Append, 'foo'>, string>, `${string}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<$<String.Append, ''>, number>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<$<String.Append, ''>, number>
]
