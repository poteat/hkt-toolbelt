import { $, Test, Parser } from '..';

type Letter_Spec = [
  /**
   * A letter parser can be applied to a string input.
   */
  Test.Expect<$<$<Parser.Run, Parser.Letter>, 'hello world'>, 'h'>
];
