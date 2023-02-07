import { $, String, Test } from "hkt-toolbelt";

type Includes_Spec = [
  /**
   * Can match on substrings.
   */
  Test.Expect<$<$<String.Includes, "oba">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<$<String.EndsWith, "qux">, "foobar">>,

  /**
   * Non-empty strings include the empty string.
   */
  Test.Expect<$<$<String.Includes, "">, "foobar">>,

  /**
   * "" includes "".
   */
  Test.Expect<$<$<String.Includes, "">, "">>,

  /**
   * "" does not include non-empty strings.
   */
  Test.ExpectNot<$<$<String.Includes, "foo">, "">>,

  /**
   * Every string includes a string.
   */
  Test.Expect<$<$<String.Includes, string>, "foobar">>,

  /**
   * "" includes a string.
   */
  Test.Expect<$<$<String.Includes, string>, "">>,

  /**
   * Non-empty strings do not include all strings.
   */
  Test.ExpectNot<$<$<String.Includes, "foobar">, string>>,

  /**
   * Every string includes a "".
   */
  Test.Expect<$<$<String.Includes, "">, string>>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.Includes<"">, number>>
];
