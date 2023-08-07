import { $, Parser, Test, Stress } from '..';

type Letters_Spec = [
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
            $<Parser.String, ' '>,
            Parser.Letters,
            $<Parser.String, ' '>,
            Parser.Letters
          ]
        >
      >,
      'hello world hello'
    >,
    ['hello', ' ', 'world', ' ', 'hello']
  >,

  /**
   * Can parse large string input.
   */
  Test.Expect<
    $<
      $<Parser.Run, Parser.Letters>,
      'helloworldhelloworldhelloworldhelloworldhelloworldhelloworld'
    >,
    'helloworldhelloworldhelloworldhelloworldhelloworldhelloworld'
  >,

  /**
   * Can parse 100 characters.
   */
  Test.Expect<
    $<$<Parser.Run, Parser.Letters>, Stress.HundredString>,
    Stress.HundredString
  >,

  /**
   * Can parse 1000 characters.
   */
  Test.Expect<
    $<
      Parser.Letters,
      {
        input: Stress.ThousandString;
        index: 0;
        result: never;
      }
    >,
    {
      input: Stress.ThousandString;
      index: 1000;
      result: Stress.ThousandString;
    }
  >
];
