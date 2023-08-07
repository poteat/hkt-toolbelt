import { $, Test, Object } from "..";

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
