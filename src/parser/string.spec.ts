import { $, Test, Parser } from '..';

type String_Spec = [
  /**
   * Can match a string literal.
   */
  Test.Expect<
    $<
      $<Parser.String, 'hello'>,
      { input: 'hello world'; index: 0; result: never }
    >,
    { input: 'hello world'; index: 5; result: 'hello' }
  >,

  /**
   * If the input does not match the string literal, the entire returned state
   * is never.
   */
  Test.Expect<
    $<$<Parser.String, 'hello'>, { input: 'world'; index: 0; result: never }>,
    never
  >
];
