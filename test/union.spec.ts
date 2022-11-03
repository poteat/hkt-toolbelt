import $, { Test, Union } from "hkt-toolbelt";

declare function overloaded(x: number): string;
declare function overloaded(x: string): string;

/**
 * Tests for `Union.ToIntersection`, which converts a union type to an
 * intersection type.
 */
type ToIntersection_Spec = [
  /**
   * `Union.ToIntersection` should convert a union type to an intersection type.
   */
  Test.Expect<
    $<Union.ToIntersection, { a: "foo" } | { b: "foo" }>,
    { a: "foo"; b: "foo" }
  >,

  /**
   * Intersection of two non-compatible types results in `never`.
   */
  Test.Expect<$<Union.ToIntersection, number | string>, never>,

  /**
   * Can combine functions, which results in a overloaded function.
   */
  Test.Expect<
    $<Union.ToIntersection, ((x: number) => string) | ((x: string) => string)>,
    typeof overloaded
  >,

  /**
   * Any non-union type is not changed.
   */
  Test.Expect<$<Union.ToIntersection, number>, number>,

  /**
   * Boolean type is not changed.
   */
  Test.Expect<$<Union.ToIntersection, boolean>, boolean>,

  /**
   * Can intersect boolean with other types.
   */
  Test.Expect<$<Union.ToIntersection, boolean | [number]>, [number] & boolean>,

  /**
   * Can intersect 'true' with other types.
   */
  Test.Expect<$<Union.ToIntersection, true | [number]>, [number] & true>,

  /**
   * Applying to true | false results in boolean.
   */
  Test.Expect<$<Union.ToIntersection, true | false>, boolean>
];

/**
 * Test `Union.ToTuple`, which converts a union type to a tuple composed of the
 * elements in the union.
 */
type ToTuple_Spec = [
  /**
   * Can convert a simple union to a tuple.
   */
  Test.Expect<$<Union.ToTuple, 1 | 2 | 3>[number], 1 | 2 | 3>,

  /**
   * Length of the tuple is the number of elements in the union.
   */
  Test.Expect<$<Union.ToTuple, 1 | 2 | 3>["length"], 3>,

  /**
   * Converting boolean results in [false, true]
   */
  Test.Expect<$<Union.ToTuple, boolean>, [false, true]>,

  /**
   * Can convert boolean union with other types.
   */
  Test.Expect<$<Union.ToTuple, string | boolean>[number], string | boolean>,

  /**
   * Converting boolean with other types results in both true and false being
   * present separately.
   */
  Test.Expect<$<Union.ToTuple, string | boolean>["length"], 3>,

  /**
   * Can handle unions of strings.
   */
  Test.Expect<$<Union.ToTuple, "foo" | "bar" | "qux">, ["foo", "bar", "qux"]>,

  /**
   * When `never` is provided, a tuple of 'never' is emitted.
   */
  Test.Expect<$<Union.ToTuple, never>, [never]>,

  /**
   * Can convert unions of tuples.
   */
  Test.Expect<$<Union.ToTuple, ["foo"] | ["bar"]>[number], ["foo"] | ["bar"]>,

  /**
   * Converting unions of tuples results in correct length.
   */
  Test.Expect<$<Union.ToTuple, ["foo"] | ["bar"]>["length"], 2>
];
