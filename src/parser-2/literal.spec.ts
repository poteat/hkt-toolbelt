import { $, Test, Parser2 } from ".."

type Literal_Spec = [
  /**
   * Can match a string literal.
   */
  Test.Expect<
    $<
      $<Parser2.Literal, "foobar">,
      { input: ["f", "o", "o", "b", "a", "r"]; index: ["0"]; result: never }
    >,
    { input: ["f", "o", "o", "b", "a", "r"]; index: ["6"]; result: "foobar" }
  >,

  /**
   * Will allow unconsumed input.
   */
  Test.Expect<
    $<
      $<Parser2.Literal, "foo">,
      { input: ["f", "o", "o", "b", "a", "r"]; index: ["0"]; result: never }
    >,
    { input: ["f", "o", "o", "b", "a", "r"]; index: ["3"]; result: "foo" }
  >,

  /**
   * If the input does not match the string literal, the entire returned state
   * is never.
   */
  Test.Expect<
    $<
      $<Parser2.Literal, "barfoo">,
      { input: ["f", "o", "o", "b", "a", "r"]; index: ["0"]; result: never }
    >,
    never
  >
]
