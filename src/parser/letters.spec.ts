import { $, Parser, Test } from "..";

type Letters_Spec = [
  /**
   * A letters parser can be applied to a string input.
   */
  Test.Expect<$<$<Parser.Run, Parser.Letters>, "hello world">, "hello">,

  /**
   * The parse will fail if the input does not start with a letter.
   */
  Test.Expect<$<$<Parser.Run, Parser.Letters>, " 123">, never>,

  /**
   * Can be applied to complex structures.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.Sequence,
          [
            Parser.Letters,
            $<Parser.String, " ">,
            Parser.Letters,
            $<Parser.String, " ">,
            Parser.Letters
          ]
        >
      >,
      "hello world hello"
    >,
    ["hello", " ", "world", " ", "hello"]
  >,

  /**
   * Can parse large string input.
   */
  Test.Expect<
    $<
      $<Parser.Run, Parser.Letters>,
      "helloworldhelloworldhelloworldhelloworldhelloworldhelloworld"
    >,
    "helloworldhelloworldhelloworldhelloworldhelloworldhelloworld"
  >,

  /**
   * Can parse 100 characters.
   */
  Test.Expect<$<$<Parser.Run, Parser.Letters>, Hundred>, Hundred>,

  /**
   * Can parse 1000 characters.
   */
  Test.Expect<
    $<
      Parser.Letters,
      {
        input: Thousand;
        index: 0;
        result: never;
      }
    >,
    {
      input: Thousand;
      index: 1000;
      result: Thousand;
    }
  >
];

type Ten = "abcdefghij";

type Hundred = `${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}${Ten}`;

type Thousand =
  `${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}${Hundred}`;
