import { $, Test, Parser } from "..";

type Choice_Spec = [
  /**
   * If we have a parser "hello" | "world", we can match "hello".
   */
  Test.Expect<
    $<
      $<Parser.Choice, [$<Parser.String, "hello">, $<Parser.String, "world">]>,
      { input: "hello world"; index: 0; result: never }
    >,
    { input: "hello world"; index: 5; result: "hello" }
  >,

  /**
   * We can also match "world".
   */
  Test.Expect<
    $<
      $<Parser.Choice, [$<Parser.String, "hello">, $<Parser.String, "world">]>,
      { input: "world hello"; index: 0; result: never }
    >,
    { input: "world hello"; index: 5; result: "world" }
  >,

  /**
   * If we have a parser "hello" | "world", matching "foobar" will result in
   * never.
   */
  Test.Expect<
    $<
      $<Parser.Choice, [$<Parser.String, "hello">]>,
      { input: "foobar"; index: 0; result: never }
    >,
    never
  >
];
