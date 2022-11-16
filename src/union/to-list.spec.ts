import { $, Test, Union } from "hkt-toolbelt";

/**
 * Test `Union.ToTuple`, which converts a union type to a tuple composed of the
 * elements in the union.
 */
type ToList_Spec = [
  /**
   * Can convert a simple union to a tuple.
   */
  Test.Expect<$<Union.ToList, 1 | 2 | 3>[number], 1 | 2 | 3>,

  /**
   * Length of the tuple is the number of elements in the union.
   */
  Test.Expect<$<Union.ToList, 1 | 2 | 3>["length"], 3>,

  /**
   * Converting boolean results in [false, true]
   */
  Test.Expect<$<Union.ToList, boolean>, [false, true]>,

  /**
   * Can convert boolean union with other types.
   */
  Test.Expect<$<Union.ToList, string | boolean>[number], string | boolean>,

  /**
   * Converting boolean with other types results in both true and false being
   * present separately.
   */
  Test.Expect<$<Union.ToList, string | boolean>["length"], 3>,

  /**
   * Can handle unions of strings.
   */
  Test.Expect<
    $<Union.ToList, "foo" | "bar" | "qux">[number],
    ["foo", "bar", "qux"][number]
  >,

  /**
   * Generates a list of the correct length.
   */
  Test.Expect<$<Union.ToList, "foo" | "bar" | "qux">["length"], 3>,

  /**
   * When `never` is provided, a tuple of 'never' is emitted.
   */
  Test.Expect<$<Union.ToList, never>, [never]>,

  /**
   * Can convert unions of tuples.
   */
  Test.Expect<$<Union.ToList, ["foo"] | ["bar"]>[number], ["foo"] | ["bar"]>,

  /**
   * Converting unions of tuples results in correct length.
   */
  Test.Expect<$<Union.ToList, ["foo"] | ["bar"]>["length"], 2>
];
