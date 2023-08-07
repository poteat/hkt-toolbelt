import { $, Test, Parser } from '..';

type TakeSequence_Spec = [
  /**
   * Can extract out one result from a sequence of parsers.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.TakeSequence,
          [$<Parser.String, 'hello'>, $<Parser.String, ' '>, [Parser.Letters]]
        >
      >,
      'hello world'
    >,
    'world'
  >
];
