import { $, Test, Object } from "hkt-toolbelt";

/**
 * Tests for `Object.At`, which returns the value at a given key in an object.
 */
type At_Spec = [
  /**
   * Can get the value at a key.
   */
  Test.Expect<$<$<Object.At, "a">, { a: 1; b: 2; c: 3 }>, 1>,

  /**
   * Can get the value at a key in a union.
   */
  Test.Expect<$<$<Object.At, "a">, { a: 1 } | { a: 2 }>, 1 | 2>,

  /**
   * Will emit an error if the key does not exist.
   */
  // @ts-expect-error
  $<$<Object.At, "a">, { b: 1 }>
];
