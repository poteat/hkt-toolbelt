import { $, Test, Parser2 } from '..'

type MySequence = $<
  Parser2.Run,
  $<
    Parser2.Sequence,
    [$<Parser2.Literal, 'hello'>, $<Parser2.Literal, ' world'>]
  >
>

type MyEmptySequence = $<Parser2.Run, $<Parser2.Sequence, []>>

type Sequence_Spec = [
  /**
   * Can match 'hello' then 'world'.
   */
  Test.Expect<$<MySequence, 'hello world'>, ['hello', ' world']>,

  /**
   * An empty sequence can matches an empty string.
   */
  Test.Expect<$<MyEmptySequence, 'foobar'>, []>
]
