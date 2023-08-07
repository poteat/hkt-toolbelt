import { $, String, Test } from "..";

type Prepend_Spec = [
  /**
   * Can prepend strings.
   */
  Test.Expect<$<$<String.Prepend, "foo">, "bar">, "foobar">,

  /**
   * Can prepend the empty string.
   */
  Test.Expect<$<$<String.Prepend, "">, "foo">, "foo">,

  /**
   * Can prepend a string.
   */
  Test.Expect<$<$<String.Prepend, string>, "foo">, `${string}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<$<String.Prepend, "">, number>, "">,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<$<String.Prepend, "">, number>, string>
];
