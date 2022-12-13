import { $, Test, Parser } from "..";

type Parser_Spec = [
  /**
   * A parser can be applied with a string input.
   */
  Test.Expect<$<Parser.Parser, "a">, unknown>
];
