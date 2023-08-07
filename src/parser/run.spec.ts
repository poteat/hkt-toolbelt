import { $, Test, Parser } from '..';

type Run_Spec = [
  /**
   * Can match literal 'hello' with a string 'hello'.
   */
  Test.Expect<$<$<Parser.Run, $<Parser.String, 'hello'>>, 'hello'>, 'hello'>,

  /**
   * Can match sequence of literal 'hello' and 'world' with a string 'hello
   * world'.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<
          Parser.Sequence,
          [$<Parser.String, 'hello'>, $<Parser.String, 'world'>]
        >
      >,
      'helloworld'
    >,
    ['hello', 'world']
  >,

  /**
   * A failing parser returns `never`.
   */
  Test.Expect<$<$<Parser.Run, $<Parser.String, 'hello'>>, 'world'>, never>
];
