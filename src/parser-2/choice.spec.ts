import { $, Test, Parser2, String } from ".."

type Choice_Spec = [
  /**
   * If we have a parser "hello" | "world", we can match "hello".
   */
  Test.Expect<
    $<
      $<
        Parser2.Choice,
        [$<Parser2.Literal, "hello">, $<Parser2.Literal, "world">]
      >,
      {
        input: String._$toList<"hello world">
        index: ["0"]
        result: never
      }
    >,
    {
      input: String._$toList<"hello world">
      index: ["5"]
      result: "hello"
    }
  >,

  /**
   * We can also match "world".
   */
  Test.Expect<
    $<
      $<
        Parser2.Choice,
        [$<Parser2.Literal, "hello">, $<Parser2.Literal, "world">]
      >,
      {
        input: String._$toList<"world hello">
        index: ["0"]
        result: never
      }
    >,
    {
      input: String._$toList<"world hello">
      index: ["5"]
      result: "world"
    }
  >,

  /**
   * If we have a parser "hello" | "world", matching "foobar" will result in
   * never.
   */
  Test.Expect<
    $<
      $<
        Parser2.Choice,
        [$<Parser2.Literal, "hello">, $<Parser2.Literal, "world">]
      >,
      {
        input: String._$toList<"foobar">
        index: ["0"]
        result: never
      }
    >,
    never
  >
]
