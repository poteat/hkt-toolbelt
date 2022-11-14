import { $, Test, Object, String, Function, Conditional } from "hkt-toolbelt";

/**
 * Tests for `Object.Keys` type, which returns the keys as a tuple.
 */
type Keys_Spec = [
  /**
   * Can get the keys of an object.
   */
  Test.Expect<$<Object.Keys, { a: 1; b: 2; c: 3 }>[number], "a" | "b" | "c">,

  /**
   * The resultant tuple has correct length.
   */
  Test.Expect<$<Object.Keys, { a: 1; b: 2; c: 3 }>["length"], 3>,

  /**
   * The keys of an empty object is an empty tuple.
   */
  Test.Expect<$<Object.Keys, {}>, []>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.Keys, number>
];

/**
 * Tests for `Object.Values` type, which returns the values as a tuple.
 */
type Values_Spec = [
  /**
   * Can get the values of an object.
   */
  Test.Expect<$<Object.Values, { a: 1; b: 2; c: 3 }>[number], 1 | 2 | 3>,

  /**
   * The values of an empty object is an empty tuple.
   */
  Test.Expect<$<Object.Values, {}>, []>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.Values, number>
];

type MapKeys_Spec = [
  /**
   * Can map the keys of an object.
   */
  Test.Expect<
    $<Object.MapKeys<String.ToUpper>, { a: 1; b: 2; c: 3 }>,
    { A: 1; B: 2; C: 3 }
  >,

  /**
   * MapKeys does not apply recursively.
   */
  Test.Expect<
    $<Object.MapKeys<String.ToUpper>, { a: 1; b: { c: 2; d: 3 } }>,
    { A: 1; B: { c: 2; d: 3 } }
  >,

  /**
   * Requires the function to return a string.
   */
  // @ts-expect-error
  $<Object.MapKeys<String.EndsWith<"foo">>, { a: 1; b: 2; c: 3 }>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.MapKeys<String.ToUpper>, number>
];

type MapValues_Spec = [
  /**
   * Can map the values of an object.
   */
  Test.Expect<
    $<Object.MapValues<String.ToUpper>, { a: "foo"; b: "bar"; c: "baz" }>,
    { a: "FOO"; b: "BAR"; c: "BAZ" }
  >,

  /**
   * Checks that the value is the input type.
   */
  // @ts-expect-error
  $<Object.MapValues<String.ToUpper>, { a: 1; b: 2; c: 3 }>,

  /**
   * MapValues does not apply recursively.
   */
  Test.Expect<
    $<
      Object.MapValues<
        Conditional.If<String.IsString, String.ToUpper, Function.Identity>
      >,
      { a: "foo"; b: { c: "bar"; d: "baz" } }
    >,
    { a: "FOO"; b: { c: "bar"; d: "baz" } }
  >,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.MapValues<String.ToUpper>, number>
];

/**
 * Tests for `Object.DeepMap` type, which maps over nested values in an object.
 */
type DeepMapValues_Spec = [
  /**
   * Can map over an object.
   */
  Test.Expect<
    $<
      Object.DeepMapValues<String.StartsWith<"foo">>,
      { a: "foobar"; b: "foo"; c: "bar" }
    >,
    { a: true; b: true; c: false }
  >,

  /**
   * Can map over a nested object.
   */
  Test.Expect<
    $<
      Object.DeepMapValues<String.StartsWith<"foo">>,
      { a: { b: "foobar"; c: "foo" }; d: "bar" }
    >,
    { a: { b: true; c: true }; d: false }
  >,

  /**
   * Emits an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.DeepMap<String.StartsWith<"foo">>, number>,

  /**
   * Emits an error if the specified mapper cannot be applied to the object's
   * values.
   */
  // @ts-expect-error
  $<Object.DeepMapValues<String.StartsWith<"foo">>, { a: 1; b: 2; c: 3 }>,

  /**
   * Can be applied conditionally using `If`.
   */
  Test.Expect<
    $<
      Object.DeepMapValues<
        Conditional.If<
          String.IsString,
          String.StartsWith<"foo">,
          Function.Identity
        >
      >,
      {
        name: {
          first: "foo";
          last: "bar";
        };
        age: 42;
      }
    >,
    {
      name: {
        first: true;
        last: false;
      };
      age: 42;
    }
  >
];

/**
 * Tests for `Object.Paths`, which returns the paths to all values in an object
 * as a tuple.
 */
type Paths_Spec = [
  /**
   * Can get the paths of an object.
   */
  Test.Expect<
    $<
      Object.Paths,
      {
        name: {
          first: string;
          last: string;
        };
        age: number;
      }
    >,
    [["name"], ["name", "first"], ["name", "last"], ["age"]]
  >,

  /**
   * The paths of an empty object is an empty tuple.
   */
  Test.Expect<$<Object.Paths, {}>, []>,

  /**
   * Will emit an error if applied to a non-object.
   */
  // @ts-expect-error
  $<Object.Paths, number>,

  /**
   * Can handle larger structures.
   */
  Test.Expect<
    $<
      Object.Paths,
      {
        name: {
          first: string;
          last: string;
        };
        age: number;
        address: {
          street: string;
          city: string;
          state: string;
          zip: {
            code: string;
          };
        };
      }
    >,
    [
      ["name"],
      ["name", "first"],
      ["name", "last"],
      ["age"],
      ["address"],
      ["address", "street"],
      ["address", "city"],
      ["address", "state"],
      ["address", "zip"],
      ["address", "zip", "code"]
    ]
  >,

  /**
   * Can handle combinatorial structures.
   */
  Test.Expect<
    $<
      Object.Paths,
      {
        a: {
          aa: {
            aaa: string;
            aab: string;
          };
          ab: {
            aba: string;
            abb: string;
          };
        };
        b: {
          ba: {
            baa: string;
            bab: string;
          };
          bb: {
            bba: string;
            bbb: string;
          };
        };
      }
    >[number],
    [
      ["a"],
      ["a", "aa"],
      ["a", "aa", "aaa"],
      ["a", "aa", "aab"],
      ["a", "ab"],
      ["a", "ab", "aba"],
      ["a", "ab", "abb"],
      ["b"],
      ["b", "ba"],
      ["b", "ba", "baa"],
      ["b", "ba", "bab"],
      ["b", "bb"],
      ["b", "bb", "bba"],
      ["b", "bb", "bbb"]
    ][number]
  >
];

/**
 * Tests for `Object.At`, which returns the value at a given key in an object.
 */
type At_Spec = [
  /**
   * Can get the value at a key.
   */
  Test.Expect<$<Object.At<"a">, { a: 1; b: 2; c: 3 }>, 1>,

  /**
   * Can get the value at a key in a union.
   */
  Test.Expect<$<Object.At<"a">, { a: 1 } | { a: 2 }>, 1 | 2>,

  /**
   * Will emit an error if the key does not exist.
   */
  // @ts-expect-error
  $<Object.At<"a">, { b: 1 }>
];

/**
 * Tests for `Object.AtPath`, which returns the value at a given path in an
 * object. The path is specified as a tuple of keys.
 */
type AtPath_Spec = [
  /**
   * Can get the value at a path.
   */
  Test.Expect<
    $<
      Object.AtPath<["name", "first"]>,
      {
        name: {
          first: "foo";
          last: string;
        };
        age: number;
      }
    >,
    "foo"
  >,

  /**
   * Can get the value at a path in a union.
   */
  Test.Expect<
    $<
      Object.AtPath<["name", "first"]>,
      | {
          name: {
            first: "foo";
            last: string;
          };
          age: number;
        }
      | {
          name: {
            first: "bar";
            last: string;
          };
          age: number;
        }
    >,
    "foo" | "bar"
  >,

  /**
   * Will emit never if the path does not exist.
   */
  Test.Expect<
    $<
      Object.AtPath<["name", "first"]>,
      { name: { last: string }; age: number }
    >,
    never
  >
];
