import { $, Test, Parser, Stress } from ".."

type Many1_Spec = [
  /**
   * Can match a single character.
   */
  Test.Expect<
    $<
      $<Parser.Many1, $<Parser.String, "a">>,
      {
        input: "a"
        index: 0
        result: never
      }
    >,
    {
      input: "a"
      index: 1
      result: ["a"]
    }
  >,

  /**
   * Can match multiple characters.
   */
  Test.Expect<
    $<
      $<Parser.Many1, $<Parser.String, "a">>,
      {
        input: "aaaaa"
        index: 0
        result: never
      }
    >,
    {
      input: "aaaaa"
      index: 5
      result: ["a", "a", "a", "a", "a"]
    }
  >,

  /**
   * Can match 10 characters.
   */
  Test.Expect<
    $<$<Parser.Run, $<Parser.Many1, $<Parser.String, "x">>>, Stress.TenString>,
    Stress.TenTuple
  >
]
