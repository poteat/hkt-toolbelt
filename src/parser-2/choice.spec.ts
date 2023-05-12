import { $, Test, Parser2 } from '..'

type Choice_Spec = [
  /**
   * If we have a parser "hello" | "world", we can match "hello".
   */
  Test.Expect<
    $<
      $<
        Parser2.Choice,
        [$<Parser2.Literal, 'hello'>, $<Parser2.Literal, 'world'>]
      >,
      {
        input: 'hello world'
        result: never
      }
    >,
    {
      input: ' world'
      result: 'hello'
    }
  >,

  /**
   * We can also match "world".
   */
  Test.Expect<
    $<
      $<
        Parser2.Choice,
        [$<Parser2.Literal, 'hello'>, $<Parser2.Literal, 'world'>]
      >,
      {
        input: 'world hello'
        result: never
      }
    >,
    {
      input: ' hello'
      result: 'world'
    }
  >,

  /**
   * If we have a parser "hello" | "world", matching "foobar" will result in
   * never.
   */
  Test.Expect<
    $<
      $<
        Parser2.Choice,
        [$<Parser2.Literal, 'hello'>, $<Parser2.Literal, 'world'>]
      >,
      {
        input: 'foobar'
        result: never
      }
    >,
    never
  >
]
