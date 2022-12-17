import { $, $$, Test, Parser, Number } from "..";

type Map_Spec = [
  /**
   * Can map a parser '123' to a number using parser result mapping.
   */
  Test.Expect<
    $<
      $$<[Parser.String, $<Parser.Map, Number.FromString>, Parser.Run], "123">,
      "123"
    >,
    123
  >
];
