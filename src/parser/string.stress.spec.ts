import { $, Test, Parser, Stress } from "..";

type String_StressSpec = [
  /**
   * Can match a string literal of 1000 length.
   */
  Test.Expect<
    $<
      $<Parser.String, Stress.ThousandString>,
      { input: Stress.ThousandString; index: 0; result: never }
    >,
    {
      input: Stress.ThousandString
      index: 1_000
      result: Stress.ThousandString
    }
  >,

  /**
   * Can perform a single match at the end of a 1000 length string.
   */
  Test.Expect<
    $<
      $<Parser.String, "x">,
      { input: `${Stress.ThousandString}`; index: 999; result: never }
    >,
    {
      input: `${Stress.ThousandString}`
      index: 1_000
      result: "x"
    }
  >
];
