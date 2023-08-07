import { $, String, Test } from '..'

type Length_Spec = [
  /**
   * Can get the length of a string.
   */
  Test.Expect<$<String.Length, 'foo'>, 3>,

  /**
   * The length of an empty string is 0.
   */
  Test.Expect<$<String.Length, ''>, 0>,

  /**
   * The length of a string is 'number'.
   */
  Test.Expect<$<String.Length, string>, number>,

  /**
   * A variadic string is of length `number`.
   */
  Test.Expect<$<String.Length, `foo${string}`>, number>
]
