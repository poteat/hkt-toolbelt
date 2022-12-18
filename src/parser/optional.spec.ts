import { $, Test, Parser } from "..";

type Optional_Spec = [
  /**
   * Can make a parser optional in a sequence, and have it match.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.Sequence,
          [
            $<Parser.String, "hello">,
            $<Parser.Optional, $<Parser.String, " ">>,
            Parser.Letters
          ]
        >
      >,
      "hello world"
    >,
    ["hello", " ", "world"]
  >,

  /**
   * Can make a parser optional in a sequence, and have it not match.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.Sequence,
          [
            $<Parser.String, "hello">,
            $<Parser.Optional, $<Parser.String, " ">>,
            Parser.Letters
          ]
        >
      >,
      "helloworld"
    >,
    ["hello", never, "world"]
  >
];
