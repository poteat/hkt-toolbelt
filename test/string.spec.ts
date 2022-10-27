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

type IsTemplateLiteral_Spec = [
  /**
   * A template literal string is a template literal string.
   */
  Test.Expect<$<String.IsTemplate, `foo${string}`>, true>,

  /**
   * A string is not a template literal string.
   */
  Test.Expect<$<String.IsTemplate, string>, false>,

  /**
   * A literal string is not a template literal string.
   */
  Test.Expect<$<String.IsTemplate, "foo">, false>,

  /**
   * An empty string is not a template literal string.
   */
  Test.Expect<$<String.IsTemplate, "">, false>,

  /**
   * A template literal string can begin with `string`.
   */
  Test.Expect<$<String.IsTemplate, `${string}foo`>, true>,

  /**
   * An error is thrown if the input is not a string.
   */
  // @ts-expect-error
  Test.Expect<$<String.IsTemplate, number>, true>,

  /**
   * `${string}` is equal to `string` and therefore is not a template literal
   * string.
   */
  Test.Expect<$<String.IsTemplate, `${string}`>, false>
];

type Join_Spec = [
  /**
   * Can join strings.
   */
  Test.Expect<$<String.Join<"">, ["foo", "bar"]>, "foobar">,

  /**
   * Can join strings with a separator.
   */
  Test.Expect<$<String.Join<" ">, ["foo", "bar"]>, "foo bar">,

  /**
   * Joining an empty array results in the empty string.
   */
  Test.Expect<$<String.Join<"">, []>, "">,

  /**
   * Joining an array of strings results in a string.
   */
  Test.Expect<$<String.Join<"">, string[]>, string>,

  /**
   * Can join literal strings and 'string'.
   */
  Test.Expect<$<String.Join<"">, ["foo", string]>, `foo${string}`>,

  /**
   * Can join 'string' and literal strings.
   */
  Test.Expect<$<String.Join<"">, [string, "foo"]>, `${string}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Join<"">, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<
    $<String.Join<"">, ["foo", "bar"] | ["baz", "qux"]>,
    "foobar" | "bazqux"
  >,

  /**
   * Properly handles string union as the separator.
   */
  Test.Expect<$<String.Join<" " | "-">, ["foo", "bar"]>, "foo bar" | "foo-bar">,

  /**
   * Enforces string separator type.
   */
  // @ts-expect-error
  $<String.Join<1>, ["foo", "bar"]>,

  /**
   * Properly handles 'string' delimiter.
   */
  Test.Expect<$<String.Join<string>, ["foo", "bar"]>, `foo${string}bar`>,

  /**
   * All variadic tuples are joined as a string.
   */
  Test.Expect<$<String.Join<"">, ["foo", ...string[]]>, string>,

  /**
   * Properly handles variadic tuples with a separator.
   */
  Test.Expect<$<String.Join<" ">, ["foo", ...string[]]>, string>,

  /**
   * Properly handles variadic tuples with template literal separators.
   */
  Test.Expect<
    $<String.Join<` ${string} `>, ["foo", ...string[], "bar"]>,
    string
  >,

  /**
   * Can join large tuples.
   */
  Test.Expect<
    $<
      String.Join<"">,
      [
        "foo",
        "bar",
        "baz",
        "qux",
        "quux",
        "corge",
        "grault",
        "garply",
        "waldo",
        "fred",
        "plugh",
        "xyzzy",
        "thud"
      ]
    >,
    "foobarbazquxquuxcorgegraultgarplywaldofredplughxyzzythud"
  >
];

type Split_Spec = [
  /**
   * Can split strings.
   */
  Test.Expect<$<String.Split<"">, "foobar">, ["f", "o", "o", "b", "a", "r"]>,

  /**
   * Can split strings with a separator.
   */
  Test.Expect<$<String.Split<" ">, "foo bar">, ["foo", "bar"]>,

  /**
   * Splitting the empty string results in an empty array.
   */
  Test.Expect<$<String.Split<"">, "">, []>,

  /**
   * Splitting a string results in a singular string tuple.
   */
  Test.Expect<$<String.Split<"">, string>, [string]>,

  /**
   * Can split literal strings and 'string'.
   */
  Test.Expect<$<String.Split<"">, `foo${string}`>, ["f", "o", "o", string]>,

  /**
   * Can split 'string' and literal strings.
   */
  Test.Expect<$<String.Split<"">, `${string}foo`>, [string, "f", "o", "o"]>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Split<"">, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<
    $<String.Split<"">, "foobar" | "bazqux">,
    ["f", "o", "o", "b", "a", "r"] | ["b", "a", "z", "q", "u", "x"]
  >,

  /**
   * Properly handles string union as the separator.
   */
  Test.Expect<
    $<String.Split<" " | "-">, "foo bar" | "foo-bar">,
    ["foo", "bar"] | ["foo", "bar"]
  >,

  /**
   * Enforces string separator type.
   */
  // @ts-expect-error
  $<String.Split<1>, "foo bar">,

  /**
   * The 'string' delimiter is not supported and fuzzes the type.
   */
  Test.Expect<$<String.Split<string>, `foo${string}bar`>, string[]>,

  /**
   * All template literal delimiters result in string[].
   */
  Test.Expect<$<String.Split<`${string}x`>, `fooxfoo`>, string[]>,

  /**
   * Can split larger strings.
   */
  Test.Expect<
    $<
      String.Split<" ">,
      "foo bar baz qux quux corge grault garply waldo fred plugh xyzzy thud"
    >,
    [
      "foo",
      "bar",
      "baz",
      "qux",
      "quux",
      "corge",
      "grault",
      "garply",
      "waldo",
      "fred",
      "plugh",
      "xyzzy",
      "thud"
    ]
  >
];
