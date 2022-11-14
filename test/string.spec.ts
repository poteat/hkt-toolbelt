import { $, String, Test } from "hkt-toolbelt";

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
  Test.Expect<$<String.Join<" ">, ["foo", "bar", "qux"]>, "foo bar qux">,

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

/**
 * Tests for String.First, which extracts the first character type from a
 * string.
 */
type First_Spec = [
  /**
   * Can extract the first character from a string.
   */
  Test.Expect<$<String.First, "foo">, "f">,

  /**
   * Can extract the first character from an empty string.
   */
  Test.Expect<$<String.First, "">, "">,

  /**
   * Can extract the first character from a literal string.
   */
  Test.Expect<$<String.First, `foo${string}`>, "f">,

  /**
   * Can extract the first character from a template literal string.
   */
  Test.Expect<$<String.First, `${string}foo`>, string>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.First, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.First, "foobar" | "bazqux">, "f" | "b">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.First, `foo${string}bar`>, "f">,

  /**
   * The first character of a string is string.
   */
  Test.Expect<$<String.First, string>, string>
];

/**
 * Tests for String.Last, which extracts the last character type from a
 * string.
 */
type Last_Spec = [
  /**
   * Can extract the last character from a string.
   */
  Test.Expect<$<String.Last, "foo">, "o">,

  /**
   * Can extract the last character from an empty string.
   */
  Test.Expect<$<String.Last, "">, "">,

  /**
   * Can extract the last character from a literal string.
   */
  Test.Expect<$<String.Last, `foo${string}`>, string>,

  /**
   * Can extract the last character from a template literal string.
   */
  Test.Expect<$<String.Last, `${string}foo`>, "o">,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Last, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Last, "foobar" | "bazqux">, "r" | "x">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Last, `foo${string}bar`>, "r">,

  /**
   * The last character of a string is string.
   */
  Test.Expect<$<String.Last, string>, string>
];

/**
 * Tests for String.Tail, which extracts every element after the first element
 * of a string.
 */
type Tail_Spec = [
  /**
   * Can extract the tail of a string.
   */
  Test.Expect<$<String.Tail, "foo">, "oo">,

  /**
   * Can extract the tail of an empty string.
   */
  Test.Expect<$<String.Tail, "">, "">,

  /**
   * Can extract the tail of a literal string.
   */
  Test.Expect<$<String.Tail, `foo${string}`>, `oo${string}`>,

  /**
   * Can extract the tail of a template literal string.
   */
  Test.Expect<$<String.Tail, `${string}foo`>, `foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Tail, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Tail, "foobar" | "bazqux">, "oobar" | "azqux">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Tail, `foo${string}bar`>, `oo${string}bar`>,

  /**
   * The tail of a string is string.
   */
  Test.Expect<$<String.Tail, string>, string>
];

/**
 * Tests for String.Init, which extracts every element before the last element.
 */
type Init_Spec = [
  /**
   * Can extract the init of a string.
   */
  Test.Expect<$<String.Init, "foo">, "fo">,

  /**
   * Can extract the init of an empty string.
   */
  Test.Expect<$<String.Init, "">, "">,

  /**
   * Can extract the init of a literal string.
   */
  Test.Expect<$<String.Init, `foo${string}`>, `foo`>,

  /**
   * Can extract the init of a template literal string.
   */
  Test.Expect<$<String.Init, `${string}foo`>, `${string}fo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Init, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Init, "foobar" | "bazqux">, "fooba" | "bazqu">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Init, `foo${string}bar`>, `foo${string}ba`>,

  /**
   * The init of a string is string.
   */
  Test.Expect<$<String.Init, string>, string>
];

/**
 * Tests for String.Replace<From, To> which replaces all instances of From with
 * To in a string.
 */
type Replace_Spec = [
  /**
   * Can replace a string with another string.
   */
  Test.Expect<$<String.Replace<"foo", "bar">, "foobar">, "barbar">,

  /**
   * Can replace a string with an empty string.
   */
  Test.Expect<$<String.Replace<"foo", "">, "foo">, "">,

  /**
   * Can replace an empty string with a string.
   */
  Test.Expect<$<String.Replace<"", " ">, "foo">, " f o o ">,

  /**
   * Can replace an empty string with an empty string.
   */
  Test.Expect<$<String.Replace<"", "">, "foo">, "foo">,

  /**
   * Can replace a string with a template literal string.
   */
  Test.Expect<$<String.Replace<"foo", `${string}bar`>, "foo">, `${string}bar`>,

  /**
   * Handles 'string' in the From parameter by returning a string type.
   */
  Test.Expect<$<String.Replace<string, "bar">, "foo">, string>,

  /**
   * All template literal types in the 'From' field result in a string type.
   */
  Test.Expect<$<String.Replace<`${string}foo`, "bar">, "foo">, string>,

  /**
   * Handles union types in the 'From' field.
   */
  Test.Expect<
    $<String.Replace<"foo" | "bar", "baz">, "foobar">,
    "bazbar" | "foobaz"
  >,

  /**
   * Handles union types in the 'To' field.
   */
  Test.Expect<
    $<String.Replace<"foo", "bar" | "baz">, "foobar">,
    "barbar" | "bazbar"
  >,

  /**
   * Emits an error when applied to a non-string type.
   */
  // @ts-expect-error
  $<String.Replace<"foo", "bar">, number>
];

/**
 * Tests for String.Reverse, which reverses the order of characters in a string.
 */
type Reverse_Spec = [
  /**
   * Can reverse a string.
   */
  Test.Expect<$<String.Reverse, "foo">, "oof">,

  /**
   * Can reverse an empty string.
   */
  Test.Expect<$<String.Reverse, "">, "">,

  /**
   * Can reverse a template literal string.
   */
  Test.Expect<$<String.Reverse, `foo${string}`>, `${string}oof`>,

  /**
   * Can reverse a template literal string.
   */
  Test.Expect<$<String.Reverse, `${string}foo`>, `oof${string}`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.Reverse, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.Reverse, "foobar" | "bazqux">, "raboof" | "xuqzab">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<$<String.Reverse, `foo${string}bar`>, `rab${string}oof`>,

  /**
   * The reverse of a string is string.
   */
  Test.Expect<$<String.Reverse, string>, string>
];

/**
 * Tests for `String.IsString`, which checks if a type is a string.
 */
type IsString_Spec = [
  /**
   * A string is a string.
   */
  Test.Expect<$<String.IsString, "foo">, true>,

  /**
   * An empty string is a string.
   */
  Test.Expect<$<String.IsString, "">, true>,

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
  Test.Expect<$<String.IsString, "foo" | number>, boolean>,

  /**
   * A union type containing a string is kind of a string.
   */
  Test.Expect<$<String.IsString, number | "foo">, boolean>,

  /**
   * A union type that does not contain a string is not a string.
   */
  Test.Expect<$<String.IsString, number | boolean>, false>,

  /**
   * A union type that does not contain a string is not a string.
   */
  Test.Expect<$<String.IsString, boolean | number>, false>
];

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

/**
 * Tests for `String.ToLower`, which converts a string to lowercase for all
 * characters.
 */
type ToLower_Spec = [
  /**
   * Can lowercase a string.
   */
  Test.Expect<$<String.ToLower, "FOO">, "foo">,

  /**
   * Can lowercase an empty string.
   */
  Test.Expect<$<String.ToLower, "">, "">,

  /**
   * Can lowercase a template literal string.
   */
  Test.Expect<$<String.ToLower, `FOO${string}`>, `foo${Lowercase<string>}`>,

  /**
   * Can lowercase a template literal string.
   */
  Test.Expect<$<String.ToLower, `${string}FOO`>, `${Lowercase<string>}foo`>,

  /**
   * Non-string input results in a compiler error.
   */
  // @ts-expect-error
  $<String.ToLower, number>,

  /**
   * Properly handles string union types.
   */
  Test.Expect<$<String.ToLower, "FOOBAR" | "BAZQUX">, "foobar" | "bazqux">,

  /**
   * The 'string' template is supported.
   */
  Test.Expect<
    $<String.ToLower, `FOO${string}BAR`>,
    `foo${Lowercase<string>}bar`
  >,

  /**
   * The lower of a string is string.
   */
  Test.Expect<$<String.ToLower, string>, Lowercase<string>>
];
