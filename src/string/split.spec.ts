import { $, String, Test } from "hkt-toolbelt";

type Split_Spec = [
  /**
   * Can split strings.
   */
  Test.Expect<$<$<String.Split, "">, "foobar">, ["f", "o", "o", "b", "a", "r"]>,

  /**
   * Can split strings with a separator.
   */
  Test.Expect<$<$<String.Split, " ">, "foo bar">, ["foo", "bar"]>,

  /**
   * Splitting the empty string results in an empty array.
   */
  Test.Expect<$<$<String.Split, "">, "">, []>,

  /**
   * Splitting a string results in a singular string tuple.
   */
  Test.Expect<$<$<String.Split, "">, string>, [string]>,

  /**
   * Can split literal strings and 'string'.
   */
  Test.Expect<$<$<String.Split, "">, `foo${string}`>, ["f", "o", "o", string]>,

  /**
   * Can split 'string' and literal strings.
   */
  Test.Expect<$<$<String.Split, "">, `${string}foo`>, [string, "f", "o", "o"]>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<$<String.Split, "">, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<
    $<$<String.Split, "">, "foobar" | "bazqux">,
    ["f", "o", "o", "b", "a", "r"] | ["b", "a", "z", "q", "u", "x"]
  >,

  /**
   * Properly handles string union as the separator.
   */
  Test.Expect<
    $<$<String.Split, " " | "-">, "foo bar" | "foo-bar">,
    ["foo", "bar"] | ["foo", "bar"]
  >,

  /**
   * Enforces string separator type.
   */
  // @ts-expect-error
  $<$<String.Split, 1>, "foo bar">,

  /**
   * The 'string' delimiter is not supported and fuzzes the type.
   */
  Test.Expect<$<$<String.Split, string>, `foo${string}bar`>, string[]>,

  /**
   * All template literal delimiters result in string[].
   */
  Test.Expect<$<$<String.Split, `${string}x`>, `fooxfoo`>, string[]>,

  /**
   * Can split larger strings.
   */
  Test.Expect<
    $<
      $<String.Split, " ">,
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
