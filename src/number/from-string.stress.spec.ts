import { $, Test, Number } from "..";

export type FromString_Spec = [
  /**
   * Can parse a large number.
   */
  Test.Expect<$<Number.FromString, "9007199254740991">, 9007199254740991>
];
