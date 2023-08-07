import { $, Test, Number } from "..";

export type FromString_Spec = [
  /**
   * Can parse zero.
   */
  Test.Expect<$<Number.FromString, "0">, 0>,

  /**
   * Can parse a valid number.
   */
  Test.Expect<$<Number.FromString, "42">, 42>,

  /**
   * Can parse a valid negative number.
   */
  Test.Expect<$<Number.FromString, "-42">, -42>,

  /**
   * Can parse a valid floating point number.
   */
  Test.Expect<$<Number.FromString, "42.42">, 42.42>,

  /**
   * Can parse a valid negative floating point number.
   */
  Test.Expect<$<Number.FromString, "-42.42">, -42.42>,

  /**
   * The 'string' type results in never.
   */
  Test.Expect<$<Number.FromString, string>, never>
];
