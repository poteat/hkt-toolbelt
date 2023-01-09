import { $, Parser, Test } from ".."

type Letters_Spec = [
  /**
   * A letters parser can be applied to a string input.
   */
  Test.Expect<$<$<Parser.Run, Parser.Letters>, "hello world">, "hello">,

  /**
   * The parse will fail if the input does not start with a letter.
   */
  Test.Expect<$<$<Parser.Run, Parser.Letters>, " 123">, never>
]
