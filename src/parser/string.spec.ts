import { $, Test, Parser } from "..";

type String_Spec = [
  /**
   * Can match a string literal
   */
  Test.Expect<$<$<Parser.String, "a">, "a">, "a">,

  /**
   * If the input does not match the string literal, the result is never.
   */
  Test.Expect<$<$<Parser.String, "a">, "b">, never>
];
