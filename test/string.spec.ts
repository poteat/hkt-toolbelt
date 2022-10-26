import $, { String, Test } from "hkt-toolbelt";

type StartsWith_Spec = [
  /**
   * Prefixes should match correctly.
   */
  Test.Expect<$<String.StartsWith<"foo">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<String.StartsWith<"bar">, "foobar">>,

  /**
   * Non-empty strings start with "".
   */
  Test.Expect<$<String.StartsWith<"">, "foobar">>,

  /**
   * "" starts with "".
   */
  Test.Expect<$<String.StartsWith<"">, "">>,

  /**
   * "" does not start with non-empty strings.
   */
  Test.ExpectNot<$<String.StartsWith<"foo">, "">>,

  /**
   * Every string starts with a string.
   */
  Test.Expect<$<String.StartsWith<string>, "foobar">>,

  /**
   * "" starts with a string.
   */
  Test.Expect<$<String.StartsWith<string>, "">>,

  /**
   * Non-empty strings do not start with 'string'.
   */
  Test.ExpectNot<$<String.StartsWith<"foobar">, string>>,

  /**
   * Every string starts with "".
   */
  Test.Expect<$<String.StartsWith<"">, string>>
];

type EndsWith_Spec = [
  /**
   * Suffixes should match correctly.
   */
  Test.Expect<$<String.EndsWith<"bar">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<String.EndsWith<"foo">, "foobar">>,

  /**
   * Non-empty strings end with "".
   */
  Test.Expect<$<String.EndsWith<"">, "foobar">>,

  /**
   * "" end with "".
   */
  Test.Expect<$<String.EndsWith<"">, "">>,

  /**
   * "" does not end with non-empty strings.
   */
  Test.ExpectNot<$<String.EndsWith<"foo">, "">>,

  /**
   * Every string ends with a string.
   */
  Test.Expect<$<String.EndsWith<string>, "foobar">>,

  /**
   * "" ends with a string.
   */
  Test.Expect<$<String.EndsWith<string>, "">>,

  /**
   * Non-empty strings do not end with 'string'.
   */
  Test.ExpectNot<$<String.EndsWith<"foobar">, string>>,

  /**
   * Every string ends with "".
   */
  Test.Expect<$<String.EndsWith<"">, string>>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.EndsWith<"">, number>>
];

type Includes_Spec = [
  /**
   * Can match on substrings.
   */
  Test.Expect<$<String.Includes<"oba">, "foobar">>,

  /**
   * Two different strings should result in false.
   */
  Test.ExpectNot<$<String.EndsWith<"qux">, "foobar">>,

  /**
   * Non-empty strings include the empty string.
   */
  Test.Expect<$<String.Includes<"">, "foobar">>,

  /**
   * "" includes "".
   */
  Test.Expect<$<String.Includes<"">, "">>,

  /**
   * "" does not include non-empty strings.
   */
  Test.ExpectNot<$<String.Includes<"foo">, "">>,

  /**
   * Every string includes a string.
   */
  Test.Expect<$<String.Includes<string>, "foobar">>,

  /**
   * "" includes a string.
   */
  Test.Expect<$<String.Includes<string>, "">>,

  /**
   * Non-empty strings do not include all strings.
   */
  Test.ExpectNot<$<String.Includes<"foobar">, string>>,

  /**
   * Every string includes a "".
   */
  Test.Expect<$<String.Includes<"">, string>>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.Includes<"">, number>>
];

type Append_Spec = [
  /**
   * Can append strings.
   */
  Test.Expect<$<String.Append<"bar">, "foo">, "foobar">,

  /**
   * Can append the empty string.
   */
  Test.Expect<$<String.Append<"">, "foo">, "foo">,

  /**
   * Appending a string to a literal string results in a narrow variadic string.
   */
  Test.Expect<$<String.Append<string>, "foo">, `foo${string}`>,

  /**
   * Appending a literal to a string results in a narrow variadic string.
   */
  Test.Expect<$<String.Append<"foo">, string>, `${string}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Append<"">, number>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Append<"">, number>
];

type Prepend_Spec = [
  /**
   * Can prepend strings.
   */
  Test.Expect<$<String.Prepend<"foo">, "bar">, "foobar">,

  /**
   * Can prepend the empty string.
   */
  Test.Expect<$<String.Prepend<"">, "foo">, "foo">,

  /**
   * Can prepend a string.
   */
  Test.Expect<$<String.Prepend<string>, "foo">, `${string}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.Prepend<"">, number>, "">,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  Test.Expect<$<String.Prepend<"">, number>, string>
];
