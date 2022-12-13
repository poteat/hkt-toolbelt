import { $, Test, Parser } from "..";

type Choice_Spec = [
  /**
   * If we have a parser "hello" | "world", we can match "hello".
   */
  Test.Expect<
    $<
      $<Parser.Choice, [$<Parser.String, "hello">, $<Parser.String, "world">]>,
      "hello"
    >,
    "hello"
  >,

  /**
   * We can also match "world".
   */
  Test.Expect<
    $<
      $<Parser.Choice, [$<Parser.String, "hello">, $<Parser.String, "world">]>,
      "world"
    >,
    "world"
  >,

  /**
   * If we have a parser "hello" | "world", matching "foobar" will result in
   * never.
   */
  Test.Expect<$<$<Parser.Choice, [$<Parser.String, "hello">]>, "foobar">, never>
];
