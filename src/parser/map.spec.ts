import { $, $$, Test, Parser, Number, Object } from '..'

type Map_Spec = [
  /**
   * Can map a parser '123' to a number using parser result mapping.
   */
  Test.Expect<
    $<
      $$<[Parser.String, $<Parser.Map, Number.FromString>, Parser.Run], '123'>,
      '123'
    >,
    123
  >,

  /**
   * Can map a letters parser to an object using emplace.
   */
  Test.Expect<
    $<
      $<
        Parser.Run,
        $<$<Parser.Map, $<Object.Emplace, 'data'>>, Parser.Letters>
      >,
      'hello'
    >,
    { data: 'hello' }
  >
]
