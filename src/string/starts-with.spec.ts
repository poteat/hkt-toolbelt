import { $, String, Test } from "hkt-toolbelt";

type StartsWith_Spec = [
  /**
   * Prefixes should match correctly.
   */
  Test.Expect<$<$<String.StartsWith, "foo">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<$<String.StartsWith, "bar">, "foobar">>,

  /**
   * Non-empty strings start with "".
   */
  Test.Expect<$<$<String.StartsWith, "">, "foobar">>,

  /**
   * "" starts with "".
   */
  Test.Expect<$<$<String.StartsWith, "">, "">>,

  /**
   * "" does not start with non-empty strings.
   */
  Test.ExpectNot<$<$<String.StartsWith, "foo">, "">>,

  /**
   * Every string starts with a string.
   */
  Test.Expect<$<$<String.StartsWith, string>, "foobar">>,

  /**
   * "" starts with a string.
   */
  Test.Expect<$<$<String.StartsWith, string>, "">>,

  /**
   * Non-empty strings do not start with 'string'.
   */
  Test.ExpectNot<$<$<String.StartsWith, "foobar">, string>>,

  /**
   * Every string starts with "".
   */
  Test.Expect<$<$<String.StartsWith, "">, string>>
];
