import { $, Test, Parser } from "..";

type ObjectSequence_Spec = [
  /**
   * Can generate an object from a tagged sequence of parsers.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.ObjectSequence,
          [
            ["foo", $<Parser.String, "hello">],
            $<Parser.String, " ">,
            ["bar", $<Parser.String, "world">]
          ]
        >
      >,
      "hello world"
    >,
    { foo: "hello"; bar: "world" }
  >
];
